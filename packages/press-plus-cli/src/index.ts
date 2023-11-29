#!/usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';

import { deployGithubPage } from './commands/deploy-github-page';

const CLI_NAME = 'press-plus-cli';

program
  .name(CLI_NAME)
  .description('CLI for Press UI')
  .version(packageJson.version);

process.env.PRESS_PLUS_CLI_VERSION = packageJson.version;

program
  .command('deploy:github')
  .description('Deploy Github Page')
  .option('--repo <repoName>', 'Repository Name')
  .option('--user <userName>', 'User Name')
  .option('--email <email>', 'Login Email')
  .option('--target <targetDir>', 'Target Directory')
  .option('--token <token>', 'Github Token')
  .option('--message <commitMessage>', 'Commit Message')
  .action(deployGithubPage);


program.parse();
