import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSnakePlural } from "../../core"

export const CrudEntityTemplate = (rootName: string, entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Entity, Column } from "typeorm"
  import { ObjectType, Field } from "@nestjs/graphql"

  import { BaseModel } from "src/core/lib"

  @ObjectType()
  @Entity({
    name: "${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => String, { nullable: true })
    @Column()
    name: string

  }
  `
}
