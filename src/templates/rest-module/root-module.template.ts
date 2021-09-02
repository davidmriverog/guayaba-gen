import * as changeCase from "change-case"

export const RootModuleTemplate = (rootName: string) => {

  const moduleName = changeCase.pascalCase(rootName)

  return `
    import { Module } from "@nestjs/common"

    @Module({
        imports: [

        ]
    })
    export class ${moduleName}Module { }
  `
}
