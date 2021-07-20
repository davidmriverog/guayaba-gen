import * as changeCase from "change-case";
import { singular } from "pluralize";
import { customSingular } from "../../core";

export const CrudDtoCreateGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { InputType, Field } from '@nestjs/graphql';
    import { IsNotEmpty } from 'class-validator';

    @InputType()
    export class Create${singular(pascalEntity)}Input {
        @Field(() => String)
        @IsNotEmpty()
        name: string;
    }

  `;
};

export const CrudDtoUpdateGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { Create${singular(pascalEntity)}Input } from './create-${customSingular(entityName)}.input';
    import { InputType, Field, PartialType } from '@nestjs/graphql';
    import { IsNotEmpty } from 'class-validator';

    @InputType()
    export class Update${singular(pascalEntity)}Input extends PartialType(Create${singular(pascalEntity)}Input) {
      @Field(() => String)
      _id: string;

      @Field(() => String)
      @IsNotEmpty()
      name: string;
    }

    `;
};


export const ListPaginateTemplate = (entityName: string) => {

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
