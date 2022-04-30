import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from '../../utils/writer-files.util'

export const GenerateCrudServiceDBRelationalModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.service.ts`)

  const rendered = CrudServiceDBRelationalTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudServiceDBRelationalTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Injectable } from "@nestjs/common"
  import { InjectRepository } from "@nestjs/typeorm"
  import { Repository } from "typeorm"

  import { BaseService } from "src/core/lib"

  import { ${singular(pascalEntity)} } from "./entities/${singular(entityName)}.entity"

  @Injectable()
  export class ${singular(pascalEntity)}Service extends BaseService<${singular(pascalEntity)}> {

    constructor(
      @InjectRepository(${singular(pascalEntity)})
      private readonly engineRepository: Repository<${singular(pascalEntity)}>
    ) {
      super(engineRepository)

      this.modelClass = ${singular(pascalEntity)}
    }
  }
  `
}
