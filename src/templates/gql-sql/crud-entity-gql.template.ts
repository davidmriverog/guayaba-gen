import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSnakePlural } from "../../core"

export const CrudEntityGQLTemplate = (rootName: string, entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
  import { ObjectType, Field, ID } from "@nestjs/graphql"

  import { BaseModel } from "src/core/lib"

  @ObjectType()
  @Entity({
    name: "${rootName}_${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => ID, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String, { nullable: true })
    @Column()
    name: string

    @Field(() => Date, { nullable: true })
    @CreateDateColumn({ type: "timestamp" })
    createdAt?: Date

    @Field(() => Date, { nullable: true })
    @UpdateDateColumn({ type: "timestamp", default: null })
    updatedAt?: Date

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ type: "timestamp", default: null })
    deletedAt?: Date
  }

  `
}

export const CrudEntityGQLNoPrefixTemplate = (rootName: string, entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
  import { ObjectType, Field, ID } from "@nestjs/graphql"

  import { BaseModel } from "src/core/lib"

  @ObjectType()
  @Entity({
    name: "${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => ID, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String, { nullable: true })
    @Column()
    name: string

    @Field(() => Date, { nullable: true })
    @CreateDateColumn({ type: "timestamp" })
    createdAt?: Date

    @Field(() => Date, { nullable: true })
    @UpdateDateColumn({ type: "timestamp", default: null })
    updatedAt?: Date

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ type: "timestamp", default: null })
    deletedAt?: Date
  }

  `
}
