import * as fs from "fs"
import * as path from "path"
import { CrudApiEntityNSQLTemplate } from "../../../templates/api-module-nsql/api-entity-nsql.template"


import { customSingular } from "../../utils/convert-singular.util"
import { writeFile } from "../../utils/writer-files.util"

export const GenerateApiCrudEntityNSQLModule = async (rootName: string, entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${customSingular(entityName)}.entity.ts`)

  const rendered = CrudApiEntityNSQLTemplate(rootName, entityName)

  await writeFile(rendered, filePath)
}
