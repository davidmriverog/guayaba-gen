import * as changeCase from "change-case";
import { singular } from "pluralize";

export const CrudEntityGQLTemplate = (rootName: string, entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
    import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

    import { BaseModel } from "../../../../core/lib";

    @ObjectType()
    @Entity({
      name: '${rootName}_${entityName}'
    })
    export class ${singular(pascalEntity)} extends BaseModel {

      @Field(() => ID, { nullable: true })
      @PrimaryGeneratedColumn()
      id: number;

      @Field(() => String, { nullable: true })
      @Column()
      name: string;

      @Field(() => Date, { nullable: true })
      @CreateDateColumn({ type: 'timestamp' })
      createdAt?: Date;

      @Field(() => Date, { nullable: true })
      @UpdateDateColumn({ type: 'timestamp', default: null })
      updatedAt?: Date;

      @Field(() => Date, { nullable: true })
      @DeleteDateColumn({ type: 'timestamp', default: null })
      deletedAt?: Date;

    }

  `;
};
