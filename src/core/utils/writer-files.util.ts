import * as Prettier from "prettier"
import * as fs from "fs"
import { isJsonFile } from "./json-file.util"

const prettierOptions: Prettier.Options = {
  parser: "typescript",
  endOfLine: "crlf",
  tabWidth: 2,
  printWidth: 200,
  semi: false
}

export const writeFile = async (
  rendered: any,
  filePath: string
) => {

  let formatted = ""
  try {
    formatted = !isJsonFile(filePath)
      ? Prettier.format(rendered, prettierOptions)
      : rendered
  } catch (error) {

    console.error(error)
    formatted = rendered
  }
  fs.writeFileSync(filePath, formatted, {
    encoding: "utf-8",
    flag: "w",
  })
}
