import { github, javascript, typescript } from 'projen';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@cdktn-contrib/cdktn-module-project',
  description: 'Projen project to construct CDKTN (sub)module repository',
  authorName: 'Joao Correia',
  authorEmail: 'joaope@users.noreply.github.com',
  keywords: ['cdktn', 'terraform', 'infrastructure', 'iac', 'projen'],
  authorOrganization: true,
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
  projenVersion: '0.99.34',
  eslintOptions: {
    prettier: true,
    dirs: ['src', 'test'],
  },
  jest: false,
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  releaseToNpm: true,
  npmTrustedPublishing: true,
  minMajorVersion: 1,
  repository: 'https://github.com/cdktn-contrib/cdktn-module-project',
  deps: [
    "projen@0.99.34",
  ],
  workflowNodeVersion: '24',
});

project.synth();