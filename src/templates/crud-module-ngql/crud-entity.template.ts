import * as changeCase from "change-case"
import { singular } from "pluralize"

export const CrudEntityTemplate = (rootName: string, entityName: string) => {

  const moduleName = changeCase.pascalCase(rootName)

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
    import { ObjectType, Field, Int } from '@nestjs/graphql'
    import { BaseModel } from '../../../../core/lib'
    import { Entity, Column } from 'typeorm'

    @ObjectType()
    @Entity({
      name: '${rootName}_${entityName}'
    })
    export class ${singular(pascalEntity)} extends BaseModel {

      @Field(() => String)
      @Column()
      name: string

    }

  `
}
