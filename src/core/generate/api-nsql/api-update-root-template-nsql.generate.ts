import * as fs from "fs"
import * as path from "path"
import { UpdateRootModuleNSQLTemplate } from "../../../templates/api-module-nsql/api-update-root-template-nsql.template"

import { getDefaultConfig } from "../../config/param.config"
import { writeFile } from "../../utils/writer-files.util"


export const UpdateRootNSQLModule = async (rootName: string) => {

  const defaultAppConfig = getDefaultConfig()

  const generatedPath = path.resolve(defaultAppConfig.resultPathApi, `./${rootName}`)
  const filePath = path.resolve(generatedPath, `${rootName}.module.ts`)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath) // removemos archivo anterior
  }

  const rendered = UpdateRootModuleNSQLTemplate(rootName, generatedPath)

  await writeFile(rendered, filePath)
}
