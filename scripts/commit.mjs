import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline';

const types = [
  { value: 'feat',     label: 'feat:     新功能' },
  { value: 'fix',      label: 'fix:      修复bug' },
  { value: 'docs',     label: 'docs:     文档变更' },
  { value: 'style',    label: 'style:    代码格式' },
  { value: 'refactor', label: 'refactor: 重构' },
  { value: 'perf',     label: 'perf:     性能优化' },
  { value: 'test',     label: 'test:     添加测试' },
  { value: 'build',    label: 'build:    构建/依赖' },
  { value: 'ci',       label: 'ci:       CI配置' },
  { value: 'chore',    label: 'chore:    其他杂项' },
  { value: 'revert',   label: 'revert:   回滚' },
];

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  console.log('\n请选择提交类型:');
  types.forEach((t, i) => console.log(`  ${i + 1}. ${t.label}`));

  const typeIdx = await ask('输入编号 (1-11): ');
  const type = types[parseInt(typeIdx, 10) - 1];
  if (!type) {
    console.log('❌ 无效的类型编号');
    process.exit(1);
  }

  const subject = await ask('输入简短描述: ');
  if (!subject.trim()) {
    console.log('❌ 描述不能为空');
    process.exit(1);
  }

  const message = `${type.value}: ${subject.trim()}`;
  console.log(`\n提交信息: ${message}`);

  try {
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    console.log('✅ 提交成功!');
  } catch (e) {
    console.log('❌ 提交失败，请检查错误信息');
    process.exit(1);
  }

  rl.close();
}

main();
