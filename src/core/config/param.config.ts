import * as path from "path"

import { IParamConfig } from "../interfaces/param.interface"

export function getDefaultConfig(): IParamConfig {

  return <IParamConfig>{
    resultPath: path.resolve(process.cwd(), "src"),
    resultPathApi: path.resolve(process.cwd(), "src/api"),
    resultPathGraphql: path.resolve(process.cwd(), "src/graphql"),
    resultPathAngular: path.resolve(process.cwd(), "src/app")
  }
}
