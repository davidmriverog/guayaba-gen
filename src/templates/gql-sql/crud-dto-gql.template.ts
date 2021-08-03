import * as changeCase from "change-case";
import { singular } from "pluralize";
import { customSingular } from "../../core";

export const CrudDtoCreateAndUpdateGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
  import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
  import { IsNotEmpty } from 'class-validator';

  @InputType()
  export class ${singular(pascalEntity)}InputDto {
      @Field(() => String)
      @IsNotEmpty()
      name: string;
  }
  `;
};


export const ListPaginateGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
  import { Field, PartialType, ObjectType } from '@nestjs/graphql';

  import { ListPageInfoResponse } from '../../../../core/lib/tables/criteria.table';
  import { ${singular(pascalEntity)} } from '../entities/${customSingular(entityName)}.entity';

  @ObjectType()
  export class ${singular(pascalEntity)}ListPageInfoResponse extends PartialType(ListPageInfoResponse) {

    @Field(() => [${singular(pascalEntity)}], { nullable: true})
    data?: ${singular(pascalEntity)}[];
  }
  `;
};
