import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"
import { writeFile } from "../../utils/writer-files.util"
import { customSingular, customSingularPascalCamelCase } from "../../utils/convert-singular.util"

export const GenerateCrudResolverInternalLoginModule = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.resolver.ts`)

  const rendered = CrudResolverGrapHQLInternalLoginTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudResolverGrapHQLInternalLoginTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { UseGuards } from "@nestjs/common"
  import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"

  import { FilterCriteriaInfo, GenericResult } from "src/core/lib"
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
    async findAll(@Args("criteria", { type: () => FilterCriteriaInfo, nullable: true }) criteria: FilterCriteriaInfo) {
      return await this.engineService.findAll(criteria)
    }

    @Query(() => ${singular(pascalEntity)}, { name: "${customSingularPascalCamelCase(entityName)}" })
    @UseGuards(GqlAuthGuard)
    async findOne(@Args("id", { type: () => Int }) id: number) {
      return await this.engineService.findOne(id)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async create${singular(pascalEntity)}(@Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.create(${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async update${singular(pascalEntity)}(@Args("id", { type: () => Int }) id: number, @Args("${customSingularPascalCamelCase(entityName)}InputDto") ${customSingularPascalCamelCase(entityName)}InputDto: ${singular(pascalEntity)}InputDto) {
      return await this.engineService.update(id, ${customSingularPascalCamelCase(entityName)}InputDto)
    }

    @Mutation(() => ${singular(pascalEntity)})
    @UseGuards(GqlAuthGuard)
    async remove${singular(pascalEntity)}(@Args("id", { type: () => Int }) id: number) {
      return await this.engineService.remove(id)
    }

    @Mutation(() => GenericResult)
    @UseGuards(GqlAuthGuard)
    async removes${singular(pascalEntity)}(@Args("entities", { type: () => [Int] }) entities: number[]) {
      return await this.engineService.removes(entities)
    }
  }
  `
}
