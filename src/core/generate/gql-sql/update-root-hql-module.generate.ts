import * as fs from "fs";
import * as path from "path";
import { writeFile } from '../../utils/writer-files.util';
import { getDefaultConfig } from "../../config/param.config";

import { UpdateRootHQLModuleTemplate } from "../../../templates";

export const UpdateRootGQLModule = async () => {

  const defaultAppConfig = getDefaultConfig();

  const filePath = path.resolve(defaultAppConfig.resultPathGraphql, `hql.module.ts`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // removemos archivo anterior
  }

  const rendered = UpdateRootHQLModuleTemplate(defaultAppConfig.resultPathGraphql);

  await writeFile(rendered, filePath);
};
