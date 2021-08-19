import * as fs from "fs"
import * as path from "path"
import { writeFile } from '../../utils/writer-files.util'

import { customSingular } from "../../utils/convert-singular.util"
import { CrudDtoCreateAndUpdateGQLTemplate, ListPaginateGQLTemplate } from "../../../templates/gql-sql/crud-dto-gql.template"

export const GenerateCrudDtoGQLModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./dto`)

  fs.mkdirSync(filePathEntity)

  const filePathCreateInput = path.resolve(filePathEntity, `${customSingular(entityName)}.dto.ts`)

  // CREATE AND UPDATE
  const rendered = CrudDtoCreateAndUpdateGQLTemplate(entityName)

  await writeFile(rendered, filePathCreateInput)

  // LIST PAGE

  const filePathListPageInput = path.resolve(filePathEntity, `${customSingular(entityName)}.type.ts`)

  const renderedListPageUpdated = ListPaginateGQLTemplate(entityName)

  await writeFile(renderedListPageUpdated, filePathListPageInput)

}
