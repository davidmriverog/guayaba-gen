import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from "../../../../utils/writer-files.util"
import { customSnakePlural } from "../../../../utils/convert-singular.util"

export const GenerateCrudEntityGrapHQLMySQL = async (entityName: string, pathEntity: string, prefix?: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`)

  const rendered = CrudEntityGrapHQLMySQLTemplate(entityName, prefix)

  await writeFile(rendered, filePath)
}

export const CrudEntityGrapHQLMySQLTemplate = (entityName: string, prefix?: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  const strEntityName = prefix ? `${prefix}_${customSnakePlural(entityName)}` : `${customSnakePlural(entityName)}`

  return `
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
  import { ObjectType, Field, ID } from "@nestjs/graphql"

  import { BaseModel } from "src/core/lib"

  @ObjectType()
  @Entity({
    name: "${strEntityName}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => ID, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String, { nullable: true })
    @Column()
    name: string

    @Field(() => Date, { nullable: true })
    @CreateDateColumn({ type: "datetime" })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    @UpdateDateColumn({ type: "datetime", default: null })
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ type: "datetime", default: null })
    deletedAt: Date

    // Relations
  }
  `
}
