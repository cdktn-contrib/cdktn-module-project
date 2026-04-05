import { DependencyType, github, javascript, typescript } from "projen";
import { UpgradeDependencies, UpgradeDependenciesSchedule } from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@cdktn-contrib/cdktn-module-project",
  description: "Projen project to construct CDKTN (sub)module repository",
  authorName: "Joao Correia",
  authorEmail: "joaope@users.noreply.github.com",
  keywords: ["cdktn", "terraform", "infrastructure", "iac", "projen"],
  authorOrganization: true,
  packageManager: javascript.NodePackageManager.PNPM,
  depsUpgrade: false, // we use the UpgradeDependencies task instead of the built-in deps upgrade mechanism
  pnpmVersion: "10.33.0",
  projenrcTs: true,
  projenVersion: "0.99.34",
  eslintOptions: {
    prettier: true,
    dirs: ["src", "test"],
  },
  releaseTrigger: ReleaseTrigger.workflowDispatch(),
  jest: false,
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
  },
  npmAccess: javascript.NpmAccess.PUBLIC,
  releaseToNpm: true,
  npmTrustedPublishing: true,
  minMajorVersion: 1,
  repository: "https://github.com/cdktn-contrib/cdktn-module-project",
  deps: ["projen@0.99.34"],
  devDeps: [
    "shx@0.4.0", // until https://github.com/projen/projen/issues/4368 is resolved
  ],
  workflowNodeVersion: "24",
});

// Upgrade Dependencies in two parts:
// a) Upgrade bundled dependencies as a releasable fix
// b) Upgrade devDependencies as a chore
new UpgradeDependencies(project, {
  taskName: "upgrade-bundled",
  types: [DependencyType.BUNDLED],
  cooldown: 2,
  semanticCommit: "fix",
  pullRequestTitle: "upgrade bundled dependencies",
  workflowOptions: {
    labels: ["auto-approve"],
    // Run projen's daily upgrade (and release) acyclic to the schedule that projects are on so they get updates faster
    schedule: UpgradeDependenciesSchedule.expressions(["0 12 * * *"]),
  },
});
new UpgradeDependencies(project, {
  taskName: "upgrade",
  exclude: [
    // exclude the bundled deps
    ...project.deps.all
      .filter((d: any) => d.type === DependencyType.BUNDLED)
      .map((d: any) => d.name),
    // constructs version constraint should not be changed
    "constructs",
  ],
  cooldown: 2,
  workflowOptions: {
    labels: ["auto-approve"],
  },
});

project.synth();
