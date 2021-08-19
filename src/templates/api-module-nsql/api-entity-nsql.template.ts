import * as changeCase from "change-case"
import { singular } from "pluralize"

export const CrudApiEntityNSQLTemplate = (rootName: string, entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
    import { BaseModel } from '../../../../core/lib'
    import { Entity, Column } from 'typeorm'

    @Entity({
      name: '${rootName}_${entityName.replace('-', '_')}'
    })
    export class ${singular(pascalEntity)} extends BaseModel {

      @Column()
      name: string

    }

  `
}
