import * as fs from "fs"
import * as path from "path"
import * as _ from "lodash"
import * as changeCase from "change-case"
import { writeFile } from "../../utils/writer-files.util"
import { getDefaultConfig } from "../../config/param.config"

export const UpdateRootRestAPIModule = async () => {

  const defaultAppConfig = getDefaultConfig()

  const filePath = path.resolve(defaultAppConfig.resultPathApi, `api.module.ts`)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  const rendered = UpdateRootRestAPIModuleTemplate(defaultAppConfig.resultPathApi)

  await writeFile(rendered, filePath)
}

export const UpdateRootRestAPIModuleTemplate = (pathFile: string) => {

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
  export class APIRestModule { }
  `
}
