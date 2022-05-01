import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from '../../../../utils/writer-files.util'
import { customSnakePlural } from "../../../../utils/convert-singular.util"

export const GenerateCrudEntityGrapHQLMongoDB = async (entityName: string, pathEntity: string) => {

  const filePathEntity = path.resolve(pathEntity, `./entities`)

  fs.mkdirSync(filePathEntity)

  const filePath = path.resolve(filePathEntity, `${singular(entityName)}.entity.ts`)

  const rendered = CrudEntityGrapHQLMongoDBTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudEntityGrapHQLMongoDBTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Field, ObjectType } from "@nestjs/graphql"
  import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

  import { BaseModel } from "src/core/lib"

  export type ${singular(pascalEntity)}Document = ${singular(pascalEntity)} & Document

  @ObjectType()
  @Schema({
    collection: "${customSnakePlural(entityName)}"
  })
  export class ${singular(pascalEntity)} extends BaseModel {

    @Field(() => String, { nullable: true })
    _id: string;

    @Prop({ required: true })
    @Field(() => String, { nullable: true })
    name: string
  }

  export const ${singular(pascalEntity)}Schema = SchemaFactory.createForClass(${singular(pascalEntity)})
  `
}
