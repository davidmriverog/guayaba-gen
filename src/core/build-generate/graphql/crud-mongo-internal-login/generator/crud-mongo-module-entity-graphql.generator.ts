import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from '../../../../utils/writer-files.util'
import { customSingular } from "../../../../utils/convert-singular.util"

export const GenerateCrudModuleEntityMongoGrapHQLModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.module.ts`)

  const rendered = CrudModuleEntityMongoGrapHQLTemplate(entityName)

  await writeFile(rendered, filePath)
}


export const CrudModuleEntityMongoGrapHQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Module } from "@nestjs/common"
  import { MongooseModule } from "@nestjs/mongoose"

  import { ${singular(pascalEntity)}Service } from "./${customSingular(entityName)}.service"
  import { ${singular(pascalEntity)}Resolver } from "./${customSingular(entityName)}.resolver"

  import { ${singular(pascalEntity)}, ${singular(pascalEntity)}Schema } from "./entities/${customSingular(entityName)}.entity"

  @Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: ${singular(pascalEntity)}.name,
          schema: ${singular(pascalEntity)}Schema
        }
      ])
    ],
    providers: [${singular(pascalEntity)}Resolver, ${singular(pascalEntity)}Service],
    exports: [${singular(pascalEntity)}Resolver, ${singular(pascalEntity)}Service]
  })
  export class ${singular(pascalEntity)}Module { }
  `
}
