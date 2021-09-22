import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import { CrudEntityGQLNoPrefixTemplate } from "../../../templates/gql-sql/crud-entity-gql.template"

import { writeFile } from '../../utils/writer-files.util'

export const GenerateCrudEntityGQLModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`)

  const rendered = CrudEntityGQLNoPrefixTemplate(rootName, entityName)

  await writeFile(rendered, filePath)
}
