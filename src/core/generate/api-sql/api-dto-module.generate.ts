import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";
import { CrudApiDtoTemplate } from "../../../templates/api-module/api-entity-dto.template";

import { customSingular } from "../../utils/convert-singular.util";
import { writeFile } from "../../utils/writer-files.util";

export const GenerateApiCrudDtoModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./dto`);

  fs.mkdirSync(filePathEntity);

  const filePathCreateInput = path.resolve(filePathEntity, `${customSingular(entityName)}.dto.ts`);

  const rendered = CrudApiDtoTemplate(entityName);

  await writeFile(rendered, filePathCreateInput);
};
