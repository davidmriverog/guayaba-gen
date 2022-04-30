import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { customSingular } from "../../../../utils/convert-singular.util"
import { writeFile } from "../../../../utils/writer-files.util"

export const GenerateRestAPICrudDtoModule = async (entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./dto`)

  fs.mkdirSync(filePathEntity)

  const filePathCreateInput = path.resolve(filePathEntity, `${customSingular(entityName)}.dto.ts`)

  const rendered = CrudRestAPIDtoTemplate(entityName)

  await writeFile(rendered, filePathCreateInput)
}

export const CrudRestAPIDtoTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { IsNotEmpty } from 'class-validator'

  export class ${singular(pascalEntity)}Dto {
    @IsNotEmpty()
    name: string
  }
  `
}

