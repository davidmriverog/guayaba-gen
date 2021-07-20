import * as fs from "fs";
import * as path from "path";
import { ApiRootModuleTemplate } from "../../../templates/api-module/api-root-module.template";

import { getDefaultConfig } from "../../config/param.config";

import { writeFile } from "../../utils/writer-files.util";

export const ApiGenerateRootModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig();

  const graphqlDestinationModule = `${defaultAppConfig.resultPath}/api`;

  if (!fs.existsSync(graphqlDestinationModule)) {
    fs.mkdirSync(graphqlDestinationModule);
  }

  const generatedPath = path.resolve(graphqlDestinationModule, `./${rootName}`);

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath);
  }

  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`);
  const rendered = ApiRootModuleTemplate(rootName);

  await writeFile(rendered, filePath);
};
