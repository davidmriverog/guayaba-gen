import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";

import { CrudModuleEntityTemplate } from "../../../templates/crud-module-ngql/crud-module-entity.template";

import { writeFile } from '../../utils/writer-files.util';

export const GenerateCrudModuleEntityModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.module.ts`);

  const rendered = CrudModuleEntityTemplate(entityName);

  await writeFile(rendered, filePath);
};
