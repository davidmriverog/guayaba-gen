import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";

import { CrudResolverTemplate } from "../../../templates/crud-module-ngql/crud-resolver.template";

import { writeFile } from '../../utils/writer-files.util';

export const GenerateCrudResolverModule = async (entityName: string, pathEntity: string) => {


  const filePath = path.resolve(pathEntity, `${singular(entityName)}.resolver.ts`);

  const rendered = CrudResolverTemplate(entityName);

  await writeFile(rendered, filePath);
};
