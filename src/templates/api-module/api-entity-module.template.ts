import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular } from "../../core"

export const CrudApiModuleEntityTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
    import { Module } from '@nestjs/common'
    import { TypeOrmModule } from '@nestjs/typeorm'

    import { ${singular(pascalEntity)}Service } from './${customSingular(entityName)}.service'
    import { ${singular(pascalEntity)}Controller } from './${customSingular(entityName)}.controller'
    import { ${singular(pascalEntity)} } from './entities/${customSingular(entityName)}.entity'

    @Module({
      imports: [
        TypeOrmModule.forFeature([${singular(pascalEntity)}])
      ],
      controllers: [${singular(pascalEntity)}Controller],
      providers: [${singular(pascalEntity)}Service],
      exports: [${singular(pascalEntity)}Service]
    })
    export class ${singular(pascalEntity)}Module { }
  `
}
