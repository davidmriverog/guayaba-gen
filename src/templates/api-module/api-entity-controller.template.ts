import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular } from "../../core"

export const CrudApiControllerServiceTemplate = (entityName: string) => {

    const pascalEntity = changeCase.pascalCase(entityName)

    return `
    import { Injectable } from '@nestjs/common'
    import { InjectRepository } from '@nestjs/typeorm'
    import { Repository } from 'typeorm'

    import { ${singular(pascalEntity)} } from './entities/${customSingular(entityName)}.entity'

    @Injectable()
    export class ${singular(pascalEntity)}Controller extends BaseService<${singular(pascalEntity)}> {

      constructor(
        @InjectRepository(${singular(pascalEntity)})
        private readonly engineRepository: Repository<${singular(pascalEntity)}>
      ) {
        super(engineRepository)
      }
    }

    import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common'
    import { IDatatableDtoRequest } from '../../../core/interfaces/datatable.dto'
    import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard'

    import { CurrencyDtoRequest } from './dto/currency.dto'

    import { CurrencyService } from '../../../database/ac/currencies/currencies.service'

    @Controller('currencies')
    export class CurrenciesController {

        constructor(private engineModel: CurrencyService) {
            //
        }

        @UseGuards(JwtAuthGuard)
        @Post('/listPage')
        async listPagination(@Res() response, @Body() request: IDatatableDtoRequest) {

            const datatable = await this.engineModel.listPaginate(request)

            return response.status(HttpStatus.OK).json(datatable)
        }

        @UseGuards(JwtAuthGuard)
        @Get('/')
        async findAll() {
            return await this.engineModel.findAll()
        }

        @UseGuards(JwtAuthGuard)
        @Get('/:id')
        async findById(@Param('id') id: string) {
            return await this.engineModel.find(id)
        }

        @UseGuards(JwtAuthGuard)
        @Post('/create')
        async create(@Res() response, @Body(ValidationPipe) request: CurrencyDtoRequest) {
            const result = await this.engineModel.create(request)

            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Successfull Operation.',
                data: result
            })
        }

        @UseGuards(JwtAuthGuard)
        @Put('/update/:id')
        async update(@Res() response, @Param('id') id: string, @Body(ValidationPipe) request: CurrencyDtoRequest) {
            const result = await this.engineModel.update(id, request)

            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Successfull Operation.',
                data: result
            })
        }

        @UseGuards(JwtAuthGuard)
        @Delete('/delete/:id')
        async delete(@Res() response, @Param('id') id: string) {
            const result = await this.engineModel.delete(id)

            return response.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'Successfull Operation.',
                data: result
            })
        }
    }


    `
}
