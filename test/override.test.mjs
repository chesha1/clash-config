import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { ESLint } from 'eslint';

const filePath = fileURLToPath(new URL('../index.js', import.meta.url));
const source = await readFile(filePath, 'utf8');
const eslint = new ESLint({ fix: true });
const directRule = 'DOMAIN-SUFFIX,qbittorrent.99010101.xyz,DIRECT';
const parentRule = 'DOMAIN-SUFFIX,99010101.xyz,国外流量';
const fallbackRule = 'MATCH,漏网之鱼';

function applyOverride(code, config) {
  return vm.runInNewContext(`${code}\nmain(config);`, { config });
}

test('ESLint autofix preserves personal rules before broader and fallback rules', async () => {
  const [result] = await eslint.lintText(source, { filePath });
  assert.equal(result.errorCount, 0);
  assert.equal(result.warningCount, 0);

  const config = applyOverride(result.output ?? source, {
    rules: [parentRule, fallbackRule],
  });
  const directIndex = config.rules.indexOf(directRule);
  assert.ok(directIndex >= 0);
  assert.ok(directIndex < config.rules.indexOf(parentRule));
  assert.ok(directIndex < config.rules.indexOf(fallbackRule));
});

test('repeated overrides preserve existing rules without adding duplicates', () => {
  const config = applyOverride(source, {
    rules: [parentRule, fallbackRule, directRule],
  });
  const once = Array.from(config.rules);
  assert.ok(once.includes(parentRule));
  assert.ok(once.includes(fallbackRule));
  assert.ok(once.indexOf(parentRule) < once.indexOf(fallbackRule));
  assert.equal(once.filter(rule => rule === directRule).length, 1);
  assert.deepEqual(Array.from(applyOverride(source, config).rules), once);
});

test('Set sorting remains enabled for literal values', async () => {
  const [result] = await eslint.lintText('const values = new Set(["b", "a"]);\n', { filePath });
  assert.equal(result.errorCount, 0);
  assert.ok(result.output);
  const values = vm.runInNewContext(`${result.output}\nArray.from(values);`);
  assert.deepEqual(Array.from(values), ['a', 'b']);
});
