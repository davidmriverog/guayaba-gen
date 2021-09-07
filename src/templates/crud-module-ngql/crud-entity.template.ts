import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSnakePlural } from "../../core"

export const CrudEntityTemplate = (rootName: string, entityName: string) => {

  const moduleName = changeCase.pascalCase(rootName)

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
  import { ObjectType, Field } from "@nestjs/graphql"

  import { BaseModel } from "src/core/lib"

  @ObjectType()
  @Entity({
    name: "${rootName}_${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => String, { nullable: true })
    @Column()
    name: string
    
  }
  `
}
