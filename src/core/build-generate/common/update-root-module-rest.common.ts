import * as fs from "fs"
import * as path from "path"
import * as _ from "lodash"
import * as changeCase from "change-case"

import { writeFile } from "../../utils/writer-files.util"
import { getDefaultConfig } from "../../config/param.config"

export const UpdateRootRestAPIPrefixModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig()

  const generatedPath = path.resolve(defaultAppConfig.resultPathApi, `./${rootName}`)
  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath) // removemos archivo anterior
  }

  const rendered = UpdateRootRestAPIPrefixModuleTemplate(rootName, generatedPath)

  await writeFile(rendered, filePath)
}

export const UpdateRootRestAPIPrefixModuleTemplate = (rootName: string, pathFile: string) => {

  const moduleName = changeCase.pascalCase(rootName)

  const moduleEntityImports: Array<string> = new Array<string>()
  const modulePascalEntityImports: Array<string> = new Array<string>()

  const files = fs.readdirSync(pathFile)

  const sortFiles = _.sortBy(files)

  sortFiles.forEach((file) => {

    const directory = path.join(pathFile, file)

    if (fs.statSync(directory).isDirectory()) {

      modulePascalEntityImports.push(`${changeCase.pascalCase(file)}Module`)
      moduleEntityImports.push(`import { ${changeCase.pascalCase(file)}Module } from "./${file}/${file}.module"`)
    }

  })


  return `
  import { Module } from "@nestjs/common"

  ${moduleEntityImports.join(" \n")}

  @Module({
    imports: [
      ${modulePascalEntityImports}
    ]
  })
  export class ${moduleName}Module { }
  `
}
