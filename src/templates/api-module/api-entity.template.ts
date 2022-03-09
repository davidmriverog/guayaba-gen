import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSnakePlural } from "../../core"

export const CrudApiEntityTemplate = (rootName: string, entityName: string) => {

  const moduleName = changeCase.pascalCase(rootName)

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
    import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

    @Entity({
      name: '${rootName}_${entityName}'
    })
    export class ${singular(pascalEntity)} {

      @PrimaryGeneratedColumn()
      ${singular(entityName)}_id: number

      @CreateDateColumn({ type: 'datetime', name: 'created_at' })
      createdAt: Date

      @UpdateDateColumn({ type: 'datetime', default: null, name: 'updated_at' })
      updatedAt?: Date

      @DeleteDateColumn({ type: 'datetime', default: null, name: 'deleted_at' })
      deletedAt?: Date

    }

  `
}

export const CrudApiEntitySQLTemplate = (rootName: string, entityName: string) => {

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
      updatedAt?: Date

      @DeleteDateColumn({ type: 'datetime', default: null, name: 'deleted_at' })
      deletedAt?: Date

    }

  `
}
