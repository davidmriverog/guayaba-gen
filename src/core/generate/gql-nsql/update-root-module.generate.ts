import * as fs from "fs";
import * as path from "path";
import { writeFile } from '../../utils/writer-files.util';
import { getDefaultConfig } from "../../config/param.config";

import { UpdateRootModuleTemplate } from "../../../templates/rest-module/update-root-module.template";

export const UpdateRootModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig();

  const generatedPath = path.resolve(defaultAppConfig.resultPathGraphql, `./${rootName}`);
  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // removemos archivo anterior
  }

  const rendered = UpdateRootModuleTemplate(rootName, generatedPath);

  await writeFile(rendered, filePath);
};
