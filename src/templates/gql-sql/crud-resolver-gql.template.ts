import * as changeCase from "change-case";
import { camelCase } from "change-case";
import { singular } from "pluralize";
import { customSingular, customSingularPascalCamelCase } from "../../core";

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
      constructor(private readonly engineService: ${singular(pascalEntity)}Service) { }

      @Query(() => ${singular(pascalEntity)}ListPageInfoResponse)
      // @UseGuards(GqlAuthGuard)
      async ${customSingularPascalCamelCase(pascalEntity)}ListPage(@Args('${customSingularPascalCamelCase(pascalEntity)}Criteria', { type: () => FilterCriteriaInfo }) ${customSingularPascalCamelCase(pascalEntity)}Criteria: FilterCriteriaInfo) {
        return await this.engineService.listPage(${customSingularPascalCamelCase(pascalEntity)}Criteria);
      }

      @Query(() => [${singular(pascalEntity)}], { name: '${customSingularPascalCamelCase(entityName)}FindAll' })
      // @UseGuards(GqlAuthGuard)
      async findAll() {
        return await this.engineService.findAll();
      }

      @Query(() => ${singular(pascalEntity)}, { name: '${customSingularPascalCamelCase(entityName)}' })
      // @UseGuards(GqlAuthGuard)
      async findOne(@Args('id', { type: () => Int }) id: number) {
        return await this.engineService.findOne(id);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async create${singular(pascalEntity)}(@Args('${customSingularPascalCamelCase(entityName)}InputDto') ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
        return await this.engineService.create(${customSingularPascalCamelCase(entityName)}InputDto);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async update${singular(pascalEntity)}(@Args('id', { type: () => Int }) id: number, @Args('${customSingularPascalCamelCase(entityName)}InputDto') ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
        return await this.engineService.update(id, ${customSingularPascalCamelCase(entityName)}InputDto);
      }

      @Mutation(() => ${singular(pascalEntity)})
      // @UseGuards(GqlAuthGuard)
      async remove${singular(pascalEntity)}(@Args('id', { type: () => Int }) id: number) {
        return await this.engineService.remove(id);
      }
    }
    `;
};
