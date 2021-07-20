import * as changeCase from "change-case";
import { singular } from "pluralize";
import { customSingular } from "../../core";

export const CrudResolverGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
    import { UseGuards } from '@nestjs/common';
    // import { GqlAuthGuard } from '../../../graphql/auth/guard/ggl-auth.guard';
    import { FilterCriteriaInfo } from '../../../core/lib/tables/criteria.table';

    import { ${singular(pascalEntity)}Service } from './${customSingular(entityName)}.service';
    import { ${singular(pascalEntity)} } from './entities/${customSingular(entityName)}.entity';

    import { ${singular(pascalEntity)}InputDto } from './dto/${customSingular(entityName)}.dto';
    import { ${singular(pascalEntity)}ListPageInfoResponse } from './dto/${customSingular(entityName)}.type';

    @Resolver(() => ${singular(pascalEntity)})
    export class ${singular(pascalEntity)}Resolver {
      constructor(private readonly ${singular(entityName)}Service: ${singular(pascalEntity)}Service) { }

      @Query(() => ${singular(pascalEntity)}ListPageInfoResponse)
      // @UseGuards(GqlAuthGuard)
      async ${singular(entityName)}ListPage(@Args('${singular(entityName)}Criteria', { type: () => FilterCriteriaInfo }) ${singular(entityName)}Criteria: FilterCriteriaInfo) {
        return await this.${singular(entityName)}Service.listPage(${singular(entityName)}Criteria);
      }

      @Query(() => [${singular(pascalEntity)}], { name: '${singular(entityName)}FindAll' })
      // @UseGuards(GqlAuthGuard)
      async findAll() {
        return await this.${singular(entityName)}Service.findAll();
      }

      @Query(() => ${singular(pascalEntity)}, { name: '${singular(entityName)}' })
      // @UseGuards(GqlAuthGuard)
      async findOne(@Args('id', { type: () => Int }) id: number) {
        return await this.${singular(entityName)}Service.findOne(id);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async create${singular(pascalEntity)}(@Args('${singular(entityName)}InputDto') ${singular(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
        return await this.${singular(entityName)}Service.create(${singular(entityName)}InputDto);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async update${singular(pascalEntity)}(@Args('id', { type: () => Int }) id: number, @Args('${singular(entityName)}InputDto') ${singular(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
        return await this.${singular(entityName)}Service.update(id, ${singular(entityName)}InputDto);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async remove${singular(pascalEntity)}(@Args('id', { type: () => Int }) id: number) {
        return await this.${singular(entityName)}Service.remove(id);
      }
    }
    `;
};
