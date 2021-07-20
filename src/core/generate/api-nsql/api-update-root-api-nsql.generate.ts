import * as fs from "fs";
import * as path from "path";
import { UpdateRootAPIModuleNSQLTemplate } from "../../../templates/api-module-nsql/api-update-root-api-nsql.template";

import { getDefaultConfig } from "../../config/param.config";
import { writeFile } from "../../utils/writer-files.util";


export const UpdateRootAPIModuleNSQL = async () => {

  const defaultAppConfig = getDefaultConfig();

  const filePath = path.resolve(defaultAppConfig.resultPathApi, `api.module.ts`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // removemos archivo anterior
  }

  const rendered = UpdateRootAPIModuleNSQLTemplate(defaultAppConfig.resultPathApi);

  await writeFile(rendered, filePath);
};
