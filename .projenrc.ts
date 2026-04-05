import { github, javascript, typescript } from 'projen';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@cdktn-contrib/cdktn-module-project',
  description: 'Projen project to construct CDKTN (sub)module repository',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  eslint: false,
  jest: false,
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  releaseToNpm: true,
  npmTrustedPublishing: true,
  minNodeVersion: '22.22.2',
  prettier: true,
  minMajorVersion: 1,
  repository: 'https://github.com/cdktn-contrib/cdktn-module-project',
  deps: [
    "projen@0.99.34",
  ],
  workflowNodeVersion: '24',
});

project.synth();