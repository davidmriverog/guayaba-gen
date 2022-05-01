import * as fs from "fs"
import * as path from "path"
import * as changeCase from "change-case"
import { writeFile } from '../../utils/writer-files.util'
import { getDefaultConfig } from "../../config/param.config"


export const GenerateRootGrapHQLModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig()

  const generatedPath = path.resolve(defaultAppConfig.resultPathGraphql, `./${rootName}`)

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath)
  }

  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`)
  const rendered = RootModuleGrapHQLTemplate(rootName)

  await writeFile(rendered, filePath)
}

export const GenerateRootRestAPIModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig()

  const generatedPath = path.resolve(defaultAppConfig.resultPathApi, `./${rootName}`)

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath)
  }

  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`)
  const rendered = RootModuleGrapHQLTemplate(rootName)

  await writeFile(rendered, filePath)
}

export const RootModuleGrapHQLTemplate = (rootName: string) => {

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
