import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"

import { writeFile } from '../../utils/writer-files.util'

import { CrudServiceTemplate } from "../../../templates/crud-module-ngql/crud-service.template"

export const GenerateCrudServiceModule = async (entityName: string, pathEntity: string) => {


  const filePath = path.resolve(pathEntity, `${singular(entityName)}.service.ts`)

  const rendered = CrudServiceTemplate(entityName)

  await writeFile(rendered, filePath)
}
