import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";
import { CrudApiServiceTemplate } from "../../../templates/api-module/api-entity-service.template";

import { customSingular } from "../../utils/convert-singular.util";
import { writeFile } from "../../utils/writer-files.util";

export const GenerateApiCrudServiceModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${customSingular(entityName)}.service.ts`);

  const rendered = CrudApiServiceTemplate(entityName);

  await writeFile(rendered, filePath);
};
