import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular } from "../../core"

export const CrudAPIControllerNSQLTemplate = (entityName: string) => {

    const pascalEntity = changeCase.pascalCase(entityName)

    return `
    import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, UseGuards, ValidationPipe, Query } from '@nestjs/common'
    import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard'

    import { ${singular(pascalEntity)}Service } from './${customSingular(entityName)}.service'
    import { ${singular(pascalEntity)}Dto } from './dto/${customSingular(entityName)}.dto'

    @Controller('${entityName}')
    export class ${singular(pascalEntity)}Controller {

      constructor(private engineService: ${singular(pascalEntity)}Service) {}

      @UseGuards(JwtAuthGuard)
      @Get('/listPage')
      async listPage(@Query("q") q: string) {

        const resultListPage = await this.engineService.listPaginate(q)

        return resultListPage
      }

      @UseGuards(JwtAuthGuard)
      @Get('/')
      async findAll() {
          return await this.engineService.findAll()
      }

      @UseGuards(JwtAuthGuard)
      @Get('/:id')
      async findById(@Param('id') id: string) {
        return await this.engineService.findOne(id)
      }

      @UseGuards(JwtAuthGuard)
      @Post('/create')
      async create(@Res() response, @Body(ValidationPipe) request: ${singular(pascalEntity)}Dto) {
          const result = await this.engineService.create(request)

          return response.status(HttpStatus.OK).json({
              status: HttpStatus.OK,
              message: 'Successfull Operation.',
              data: result
          })
      }

      @UseGuards(JwtAuthGuard)
      @Put('/update/:id')
      async update(@Res() response, @Param('id') id: string, @Body(ValidationPipe) request: ${singular(pascalEntity)}Dto) {
          const result = await this.engineService.update(id, request)

          return response.status(HttpStatus.OK).json({
              status: HttpStatus.OK,
              message: 'Successfull Operation.',
              data: result
          })
      }

      @UseGuards(JwtAuthGuard)
      @Delete('/delete/:id')
      async delete(@Res() response, @Param('id') id: string) {
          const result = await this.engineService.remove(id)

          return response.status(HttpStatus.OK).json({
              status: HttpStatus.OK,
              message: 'Successfull Operation.',
              data: result
          })
      }
    }

    `
}
