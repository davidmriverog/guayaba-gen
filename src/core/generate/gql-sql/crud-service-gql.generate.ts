import * as path from "path";
import { singular } from "pluralize";

import { writeFile } from '../../utils/writer-files.util';

import { CrudServiceGQLTemplate } from "../../../templates";

export const GenerateCrudServiceGQLModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.service.ts`);

  const rendered = CrudServiceGQLTemplate(entityName);

  await writeFile(rendered, filePath);
};
