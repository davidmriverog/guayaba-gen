import * as path from "path"
import { singular } from "pluralize"

import { CrudModuleEntityGQLTemplate } from "../../../templates/gql-sql/crud-module-gql-entity.template"

import { writeFile } from '../../utils/writer-files.util'

export const GenerateCrudModuleEntityGQLModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.module.ts`)

  const rendered = CrudModuleEntityGQLTemplate(entityName)

  await writeFile(rendered, filePath)
}
