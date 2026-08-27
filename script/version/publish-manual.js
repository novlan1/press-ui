/**
 * @description 【第 2 步】手动发布到 npm（支持 2FA OTP）
 *
 * 用法：
 *   pnpm release:step2 -- 123456        # 传入 6 位 OTP 验证码
 *   pnpm release:step2                  # 不传 OTP（适用于 Automation Token 场景）
 *
 * 说明：
 *   npm 账号开启了 2FA 时，publish 需要一次性验证码。
 *   而 standard-version 的钩子里 publish 是被 execSync 以子进程跑的，
 *   无法交互式输入 OTP，所以拆出这一步由人工带 --otp 执行。
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { PATH_MAP } = require('./config');


const PRE_RELEASE_VERSION = /\d+\.\d+\.\d+-(\w+)\.\d+/;
const OTP_PATTERN = /^\d{6}$/;


/** 预发布版本（如 5.1.0-beta.0）要带 --tag beta，避免污染 latest */
function getPreReleaseTag(version) {
  const match = version.match(PRE_RELEASE_VERSION);
  if (!match || !match[1]) return '';
  return match[1];
}

function readTargetVersion() {
  const pkgPath = path.join(PATH_MAP.TARGET_PACKAGES, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`产物不存在：${pkgPath}\n请先执行第 1 步：pnpm release:step1`);
  }
  // eslint-disable-next-line light/json-parse-try-catch
  const pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));
  return pkg.version;
}

function resolveOtp() {
  const raw = (process.argv[2] || process.env.NPM_OTP || '').trim();
  if (!raw) return '';
  if (!OTP_PATTERN.test(raw)) {
    throw new Error(`OTP 格式不合法（应为 6 位数字）：${raw}`);
  }
  return raw;
}


function main() {
  const version = readTargetVersion();
  const otp = resolveOtp();
  const preReleaseTag = getPreReleaseTag(version);

  let publishScript = 'npm publish';
  if (preReleaseTag) publishScript += ` --tag ${preReleaseTag}`;
  if (otp) publishScript += ` --otp=${otp}`;

  console.log(`🚀 [Step 2] 发布 press-ui@${version}`);
  console.log(`🚀 [目录] ${PATH_MAP.TARGET_PACKAGES}`);
  console.log(`🚀 [OTP] ${otp ? '已提供' : '未提供（如账号开了 2FA 会失败）'}`);
  if (preReleaseTag) console.log(`🚀 [tag] ${preReleaseTag}`);

  execSync(publishScript, {
    stdio: 'inherit',
    cwd: PATH_MAP.TARGET_PACKAGES,
  });

  console.log(`\n✅ [Step 2 完成] press-ui@${version} 已发布。`);
  console.log('👉 下一步（推送 tag + 企微通知）：');
  console.log('   pnpm release:step3\n');
}


main();
