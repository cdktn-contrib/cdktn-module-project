import { JsiiProject, JsiiProjectOptions } from "projen/lib/cdk";

export interface CdktnModuleProjectOptions extends JsiiProjectOptions {
  /**
   * The name of the module.
   */
  readonly moduleName: string;
}

export class CdktnModuleProject extends JsiiProject {
  constructor(options: CdktnModuleProjectOptions) {
    super(options);
  }
}
