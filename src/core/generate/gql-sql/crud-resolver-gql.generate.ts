import * as path from "path";

import { singular } from "pluralize";
import { CrudResolverGQLTemplate } from "../../../templates";

import { writeFile } from '../../utils/writer-files.util';

export const GenerateCrudResolverGQLModule = async (entityName: string, pathEntity: string) => {


  const filePath = path.resolve(pathEntity, `${singular(entityName)}.resolver.ts`);

  const rendered = CrudResolverGQLTemplate(entityName);

  await writeFile(rendered, filePath);
};
