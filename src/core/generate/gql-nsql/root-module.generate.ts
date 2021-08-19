import * as fs from "fs"
import * as path from "path"
import { writeFile } from '../../utils/writer-files.util'
import { getDefaultConfig } from "../../config/param.config"
import { RootModuleTemplate } from "../../../templates/rest-module/root-module.template"

export const GenerateRootModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig()

  const graphqlDestinationModule = `${defaultAppConfig.resultPath}/graphql`

  if (!fs.existsSync(graphqlDestinationModule)) {
    fs.mkdirSync(graphqlDestinationModule)
  }

  const generatedPath = path.resolve(graphqlDestinationModule, `./${rootName}`)

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath)
  }

  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`)
  const rendered = RootModuleTemplate(rootName)

  await writeFile(rendered, filePath)
}
