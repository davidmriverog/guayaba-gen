import * as path from "path"

import { singular } from "pluralize"

import { CrudResolverGQLTemplate } from "../../../templates/gql-sql/crud-resolver-gql.template"

import { writeFile } from '../../utils/writer-files.util'

export const GenerateCrudResolverGQLModule = async (entityName: string, pathEntity: string) => {


  const filePath = path.resolve(pathEntity, `${singular(entityName)}.resolver.ts`)

  const rendered = CrudResolverGQLTemplate(entityName)

  await writeFile(rendered, filePath)
}
