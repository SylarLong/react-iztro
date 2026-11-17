const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { appendFileSync } = require('node:fs');
const { name, version } = require('../package.json');

// Require an exact SemVer version without build metadata, which npm would normalize.
const identifier = '(?:0|[1-9]\\d*|\\d*[A-Za-z-][0-9A-Za-z-]*)';
const versionPattern = new RegExp(
  `^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-${identifier}(?:\\.${identifier})*)?$`,
);

function setOutput(key, value) {
  appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}

function isPublished() {
  const result = spawnSync(
    'npm',
    ['view', `${name}@${version}`, 'version', '--json', '--registry', 'https://registry.npmjs.org'],
    {
      encoding: 'utf8',
      timeout: 120000,
      env: { ...process.env, NPM_CONFIG_FETCH_RETRIES: '1', NPM_CONFIG_FETCH_TIMEOUT: '30000' },
    },
  );
  if (result.error) throw result.error;

  let response;
  try {
    response = JSON.parse(result.stdout);
  } catch {
    throw new Error('Invalid npm registry response; unable to verify whether this version exists');
  }

  if (result.status === 0) {
    assert.equal(response, version, 'npm registry returned an unexpected version');
    return true;
  }
  if (response?.error?.code === 'E404') return false;
  throw new Error(`npm registry check failed (${response?.error?.code || result.status})`);
}

try {
  assert.equal(version.trim(), version, 'Version must not contain surrounding whitespace');
  assert.match(version, versionPattern, 'Use an exact SemVer version without build metadata');
  assert.equal(process.env.RELEASE_TAG, `v${version}`, `Release tag must equal v${version}`);

  switch (process.argv[2]) {
    case 'validate':
      setOutput('npm_tag', version.includes('-') ? 'next' : 'latest');
      break;
    case 'registry': {
      const published = isPublished();
      setOutput('published', published);
      if (published) console.log(`${name}@${version} already exists; skipping npm publish`);
      break;
    }
    default:
      throw new Error('Usage: node scripts/check-release.cjs validate|registry');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
