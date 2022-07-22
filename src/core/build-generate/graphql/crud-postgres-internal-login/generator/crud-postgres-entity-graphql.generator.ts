import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from '../../../../utils/writer-files.util'
import { customSnakePlural } from "../../../../utils/convert-singular.util"

export const GenerateCrudEntityGrapHQLPostgres = async (entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`)

  const rendered = CrudEntityGrapHQLPostgresTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudEntityGrapHQLPostgresTemplate = (entityName: string) => {

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
    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date

    @Field(() => Date, { nullable: true })
    @UpdateDateColumn({ type: "timestamp with time zone", default: null })
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @DeleteDateColumn({ type: "timestamp with time zone", default: null })
    deletedAt: Date

    // Relations
  }
  `
}
