import * as path from "path";
import { singular } from "pluralize";
import { CrudAPIControllerNSQLTemplate } from "../../../templates";
import { writeFile } from "../../utils/writer-files.util";

export const GenerateAPIControllerNSQLModule = async (entityName: string, pathEntity: string) => {


  const filePath = path.resolve(pathEntity, `${singular(entityName)}.controller.ts`);

  const rendered = CrudAPIControllerNSQLTemplate(entityName);

  await writeFile(rendered, filePath);
};