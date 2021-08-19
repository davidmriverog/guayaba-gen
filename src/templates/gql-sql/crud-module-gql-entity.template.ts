import * as changeCase from "change-case"
import { singular } from "pluralize"
import { customSingular } from "../../core"

export const CrudModuleEntityGQLTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName)

  return `
  import { Module } from '@nestjs/common'
  import { TypeOrmModule } from '@nestjs/typeorm'

  import { ${singular(pascalEntity)}Service } from './${customSingular(entityName)}.service'
  import { ${singular(pascalEntity)}Resolver } from './${customSingular(entityName)}.resolver'

  import { ${singular(pascalEntity)} } from './entities/${customSingular(entityName)}.entity'

  @Module({
    imports: [
      TypeOrmModule.forFeature([${singular(pascalEntity)}])
    ],
    providers: [${singular(pascalEntity)}Resolver, ${singular(pascalEntity)}Service],
    exports: [${singular(pascalEntity)}Resolver, ${singular(pascalEntity)}Service]
  })
  export class ${singular(pascalEntity)}Module { }
  `
}
