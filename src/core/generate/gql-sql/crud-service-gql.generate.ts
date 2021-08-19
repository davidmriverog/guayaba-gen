import * as path from "path"
import { singular } from "pluralize"
import { CrudServiceGQLTemplate } from "../../../templates/gql-sql/crud-service-gql.template"

import { writeFile } from '../../utils/writer-files.util'

export const GenerateCrudServiceGQLModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.service.ts`)

  const rendered = CrudServiceGQLTemplate(entityName)

  await writeFile(rendered, filePath)
}
