import * as fs from "fs"
import * as path from "path"
import { writeFile } from '../../utils/writer-files.util'
import * as changeCase from "change-case"
import { singular } from "pluralize"

import { customSingular } from "../../utils/convert-singular.util"

export const GenerateCrudDtoGrapHQLModule = async (entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./dto`)

  fs.mkdirSync(filePathEntity)

  const filePathCreateInput = path.resolve(filePathEntity, `${customSingular(entityName)}.dto.ts`)

  // CREATE AND UPDATE

  const renderedDTO = CrudDtoCreateAndUpdateGrapHQLTemplate(entityName)

  await writeFile(renderedDTO, filePathCreateInput)

  // LIST PAGE

  const filePathListPageInput = path.resolve(filePathEntity, `${customSingular(entityName)}.type.ts`)

  const renderedListPageUpdated = ListPaginateGrapHQLTemplate(entityName)

  await writeFile(renderedListPageUpdated, filePathListPageInput)

}

export const CrudDtoCreateAndUpdateGrapHQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { InputType, Field } from "@nestjs/graphql"
  import { IsNotEmpty } from "class-validator"

  @InputType()
  export class ${singular(pascalEntity)}InputDto {
    @Field(() => String)
    @IsNotEmpty()
    name: string
  }
  `
}

export const ListPaginateGrapHQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Field, PartialType, ObjectType } from "@nestjs/graphql"

  import { ListPageInfoResponse } from "src/core/lib"

  import { ${singular(pascalEntity)} } from "../entities/${customSingular(entityName)}.entity"

  @ObjectType()
  export class ${singular(pascalEntity)}ListPageInfoResponse extends PartialType(ListPageInfoResponse) {

    @Field(() => [${singular(pascalEntity)}], { nullable: true})
    data?: ${singular(pascalEntity)}[]
  }
  `
}
