import * as path from "path"
import { singular } from "pluralize"
import * as changeCase from "change-case"

import { writeFile } from "../../../../utils/writer-files.util"
import { customSingular } from "../../../../utils/convert-singular.util"

export const GenerateRestAPIControllerClass = async (entityName: string, pathEntity: string) => {

  const filePath = path.resolve(pathEntity, `${singular(entityName)}.controller.ts`)

  const rendered = CrudRestAPIControllerTemplate(entityName)

  await writeFile(rendered, filePath)
}

export const CrudRestAPIControllerTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, UseGuards, ValidationPipe, Query } from "@nestjs/common"
  import { JwtAuthGuard } from "../../auth/strategies/jwt-auth.guard"

  import { ${singular(pascalEntity)}Service } from "./${customSingular(entityName)}.service"
  import { ${singular(pascalEntity)}Dto } from "./dto/${customSingular(entityName)}.dto"

  @Controller("${entityName}")
  export class ${singular(pascalEntity)}Controller {

    constructor(private engineService: ${singular(pascalEntity)}Service) {}

    @UseGuards(JwtAuthGuard)
    @Get("/listPage")
    async listPage(@Query("q") q: string) {
      return await this.engineService.listPage(q)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async findAll(@Query("q") q: string) {
      return await this.engineService.findAll(q)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async findById(@Param("id") id: number) {
      return await this.engineService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async create(@Res() response, @Body(ValidationPipe) request: ${singular(pascalEntity)}Dto) {
      const result = await this.engineService.create(request)

      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Successfull Operation.",
        data: result
      })
    }

    @UseGuards(JwtAuthGuard)
    @Put("/update/:id")
    async update(@Res() response, @Param("id") id: number, @Body(ValidationPipe) request: ${singular(pascalEntity)}Dto) {
      const result = await this.engineService.update(id, request)

      return response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Successfull Operation.",
        data: result
      })
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/delete/:id")
    async delete(@Res() response, @Param("id") id: number) {
      const result = await this.engineService.remove(id)

      return response.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Successfull Operation.",
      data: result
      })
    }
  }
  `
}
