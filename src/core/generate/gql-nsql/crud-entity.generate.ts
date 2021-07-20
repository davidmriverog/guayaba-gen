import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";

import { writeFile } from '../../utils/writer-files.util';

import { CrudEntityTemplate } from "../../../templates/crud-module-ngql/crud-entity.template";

export const GenerateCrudEntityModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`);

  fs.mkdirSync(filePathEntity);

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`);

  const rendered = CrudEntityTemplate(rootName, entityName);

  await writeFile(rendered, filePath);
};
