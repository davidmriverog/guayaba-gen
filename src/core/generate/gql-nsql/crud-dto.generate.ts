import * as fs from "fs";
import * as path from "path";
import { singular } from "pluralize";

import { writeFile } from '../../utils/writer-files.util';

import { CrudDtoCreateTemplate, CrudDtoUpdateTemplate, ListPaginateTemplate } from "../../../templates";
import { customSingular } from "../../utils/convert-singular.util";

export const GenerateCrudDtoModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./dto`);

  fs.mkdirSync(filePathEntity);

  const filePathCreateInput = path.resolve(filePathEntity, `create-${customSingular(entityName)}.input.ts`);

  // CREATE
  const rendered = CrudDtoCreateTemplate(entityName);

  await writeFile(rendered, filePathCreateInput);

  // UPDATE

  const filePathUpdateInput = path.resolve(filePathEntity, `update-${customSingular(entityName)}.input.ts`);

  const renderedUpdated = CrudDtoUpdateTemplate(entityName);

  await writeFile(renderedUpdated, filePathUpdateInput);

  // LIST PAGE

  const filePathListPageInput = path.resolve(filePathEntity, `${customSingular(entityName)}.type.ts`);

  const renderedListPageUpdated = ListPaginateTemplate(entityName);

  await writeFile(renderedListPageUpdated, filePathListPageInput);

};
