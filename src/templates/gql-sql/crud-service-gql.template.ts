import * as changeCase from "change-case"
import { singular } from "pluralize"

export const CrudServiceGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Injectable } from '@nestjs/common'
  import { InjectRepository } from '@nestjs/typeorm'
  import { Repository } from 'typeorm'
  import { BaseService } from '../../../core/lib'

  import { ${singular(pascalEntity)} } from './entities/${singular(entityName)}.entity'

  @Injectable()
  export class ${singular(pascalEntity)}Service extends BaseService<${singular(pascalEntity)}> {

    constructor(
      @InjectRepository(${singular(pascalEntity)})
      private readonly engineRepository: Repository<${singular(pascalEntity)}>
    ) {
      super(engineRepository)
    }
  }
  `
}
