import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import { CrudApiEntitySQLTemplate, CrudApiEntityTemplate } from "../../../templates/api-module/api-entity.template"

import { customSingular } from "../../utils/convert-singular.util"
import { writeFile } from "../../utils/writer-files.util"

export const GenerateApiCrudEntityModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${customSingular(entityName)}.entity.ts`)

  const rendered = CrudApiEntitySQLTemplate(rootName, entityName)

  await writeFile(rendered, filePath)
}
