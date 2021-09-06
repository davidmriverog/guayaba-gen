import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular, customSingularPascalCamelCase } from "../../core"

export const CrudResolverGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"

  import { Protected, FilterCriteriaInfo } from "src/core/lib"

  import { ${singular(pascalEntity)}Service } from "./${customSingular(entityName)}.service"
  import { ${singular(pascalEntity)} } from "./entities/${customSingular(entityName)}.entity"

  import { ${singular(pascalEntity)}InputDto } from "./dto/${customSingular(entityName)}.dto"
  import { ${singular(pascalEntity)}ListPageInfoResponse } from "./dto/${customSingular(entityName)}.type"

  @Resolver(() => ${singular(pascalEntity)})
  export class ${singular(pascalEntity)}Resolver {
    constructor(private readonly engineService: ${singular(pascalEntity)}Service) { }

    @Query(() => ${singular(pascalEntity)}ListPageInfoResponse)
    @Protected()
    async ${customSingularPascalCamelCase(pascalEntity)}ListPage(@Args("${customSingularPascalCamelCase(pascalEntity)}Criteria", { type: () => FilterCriteriaInfo }) ${customSingularPascalCamelCase(pascalEntity)}Criteria: FilterCriteriaInfo) {
      return await this.engineService.listPage(${customSingularPascalCamelCase(pascalEntity)}Criteria)
    }

    @Query(() => [${singular(pascalEntity)}], { name: "${customSingularPascalCamelCase(entityName)}FindAll" })
    @Protected()
    async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
      return await this.engineService.findAll(criteria)
    }

    @Query(() => ${singular(pascalEntity)}, { name: "${customSingularPascalCamelCase(entityName)}" })
    @Protected()
    async findOne(@Args("id", { type: () => Int }) id: number) {
      return await this.engineService.findOne(id)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @Protected()
    async create${singular(pascalEntity)}(@Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.create(${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @Protected()
    async update${singular(pascalEntity)}(@Args("id", { type: () => Int }) id: number, @Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.update(id, ${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @Protected()
    async remove${singular(pascalEntity)}(@Args("id", { type: () => Int }) id: number) {
      return await this.engineService.remove(id)
    }
  }
  `
}
