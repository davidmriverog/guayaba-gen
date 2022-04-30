import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from "../../../../utils/writer-files.util"
import { customSnakePlural } from "../../../../utils/convert-singular.util"

export const GenerateCrudEntityRestAPIMySQL = async (entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`)

  const rendered = CrudEntityRestAPIMySQLTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudEntityRestAPIMySQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

  @Entity({
    name: "${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime', default: null, name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'datetime', default: null, name: 'deleted_at' })
    deletedAt: Date

  }
  `
}
