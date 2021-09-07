import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular, customSingularPascalCamelCase } from "../../core"

export const CrudResolverTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { UseGuards } from "@nestjs/common"
  import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"

  import { IFilterCriterion, FilterCriteriaInfo } from "src/core/lib"
  import { GqlAuthGuard } from '../../../graphql/auth/guard/ggl-auth.guard'

  import { ${singular(pascalEntity)}Service } from "./${customSingular(entityName)}.service"
  import { ${singular(pascalEntity)} } from "./entities/${customSingular(entityName)}.entity"

  import { ${singular(pascalEntity)}InputDto } from "./dto/${customSingular(entityName)}.dto"
  import { ${singular(pascalEntity)}ListPageInfoResponse } from "./dto/${customSingular(entityName)}.type"

  @Resolver(() => ${singular(pascalEntity)})
  export class ${singular(pascalEntity)}Resolver {
    constructor(private readonly engineService: ${singular(pascalEntity)}Service) { }

    @Query(() => ${singular(pascalEntity)}ListPageInfoResponse)
    @UseGuards(GqlAuthGuard)
    async ${customSingularPascalCamelCase(pascalEntity)}ListPage(@Args("${customSingularPascalCamelCase(pascalEntity)}Criteria", { type: () => FilterCriteriaInfo }) ${customSingularPascalCamelCase(pascalEntity)}Criteria: FilterCriteriaInfo) {
      return await this.engineService.listPage(${customSingularPascalCamelCase(pascalEntity)}Criteria)
    }

    @Query(() => [${singular(pascalEntity)}], { name: "${customSingularPascalCamelCase(entityName)}FindAll" })
    @UseGuards(GqlAuthGuard)
    async findAll(@Args("filters", { type: () => [IFilterCriterion], nullable: true }) filters: IFilterCriterion[]) {
      return await this.engineService.findAll(filters);
    }

    @Query(() => ${singular(pascalEntity)}, { name: "${customSingularPascalCamelCase(entityName)}" })
    @UseGuards(GqlAuthGuard)
    async findOne(@Args("id", { type: () => String }) id: string) {
      return await this.engineService.findOne(id)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async create${singular(pascalEntity)}(@Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.create(${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async update${singular(pascalEntity)}(@Args("id", { type: () => String }) id: string, @Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.update(id, ${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async remove${singular(pascalEntity)}(@Args("id", { type: () => String }) id: string) {
      return await this.engineService.remove(id)
    }
  }
    
  `
}
