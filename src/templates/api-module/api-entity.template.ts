import * as changeCase from "change-case";
import { singular } from "pluralize";

export const CrudApiEntityTemplate = (rootName: string, entityName: string) => {

  const moduleName = changeCase.pascalCase(rootName);

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

    @Entity({
      name: '${rootName}_${entityName}'
    })
    export class ${singular(pascalEntity)} {

      @PrimaryGeneratedColumn()
      ${singular(entityName)}_id: number;

      @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
      createdAt: Date;

      @UpdateDateColumn({ type: 'timestamp', default: null, name: 'updated_at' })
      updatedAt?: Date;

      @DeleteDateColumn({ type: 'timestamp', default: null, name: 'deleted_at' })
      deletedAt?: Date;

    }

  `;
};
