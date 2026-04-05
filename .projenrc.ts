import { github, javascript, typescript } from 'projen';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@cdktn-contrib/cdktn-module-project',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  eslint: false,
  jest: false,
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  releaseToNpm: true,
  minNodeVersion: '22.22.2',
  prettier: true,
  minMajorVersion: 1,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();