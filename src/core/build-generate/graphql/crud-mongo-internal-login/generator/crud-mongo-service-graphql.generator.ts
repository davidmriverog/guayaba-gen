import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from '../../../../utils/writer-files.util'

export const GenerateCrudServiceMongoDBModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.service.ts`)

  const rendered = CrudServiceMongoDBTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudServiceMongoDBTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Injectable } from "@nestjs/common"
  import { InjectConnection, InjectModel } from "@nestjs/mongoose"

  import { Model } from "mongoose"
  import * as mongoose from "mongoose"

  import { BaseService } from "src/core/lib"

  import { ${singular(pascalEntity)}, ${singular(pascalEntity)}Document } from "./entities/${singular(entityName)}.entity"

  @Injectable()
  export class ${singular(pascalEntity)}Service extends BaseService<${singular(pascalEntity)}Document> {

    constructor(
      @InjectModel(${singular(pascalEntity)}.name) private readonly engineModel: Model<${singular(pascalEntity)}Document>,
      @InjectConnection() private readonly connection: mongoose.Connection
    ) {
      super(engineModel, connection)

      this.modelClass = ${singular(pascalEntity)}
    }
  }
  `
}
