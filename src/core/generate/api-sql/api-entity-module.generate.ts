import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";
import { CrudApiModuleEntityTemplate } from "../../../templates";
import { customSingular } from "../../utils/convert-singular.util";
import { writeFile } from "../../utils/writer-files.util";

export const GenerateApiCrudModuleEntityModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${customSingular(entityName)}.module.ts`);

  const rendered = CrudApiModuleEntityTemplate(entityName);

  await writeFile(rendered, filePath);
};