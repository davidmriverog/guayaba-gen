import * as fs from "fs"
import * as path from "path"

import cli from "cli-ux"
import inquirer from "inquirer"

import { Command, flags } from "@oclif/command"

import { singular } from "pluralize"

import {
  ApiGenerateRootModule,
  customSingular,
  GenerateAPIControllerNSQLModule,
  GenerateApiCrudDtoModule,
  GenerateApiCrudEntityNSQLModule,
  GenerateApiCrudModuleEntityModule,
  GenerateApiCrudServiceModule,
  UpdateRootNSQLModule,
  getDefaultConfig,
  UpdateRootAPIModuleNSQL
} from "../../core"

export class APIRestCrudNOSQLModule extends Command {

  static description = 'Generador de Module ROOT API - REST (MONGO)'

  static flags = {
    help: flags.help({ char: 'h' }),
    prefix: flags.string({ char: 'e', description: 'prefix name' }),
    name: flags.string({ char: 'e', description: 'root module name' }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {

    const defaultAppConfig = getDefaultConfig()

    const { args, flags } = this.parse(APIRestCrudNOSQLModule)

    const prefix: string = flags.prefix ?? await this.promptPrefixName()
    const name: string = flags.name ?? await this.promptName()

    const generatedPath = path.resolve(defaultAppConfig.resultPathApi, `./${prefix}`)

    cli.action.start(`Check API Module [${prefix}]`)

    if (!fs.existsSync(generatedPath)) {

      await ApiGenerateRootModule(prefix)
    }

    const crudModelPath = path.resolve(generatedPath, `./${customSingular(name)}`)

    if (!fs.existsSync(crudModelPath)) {
      fs.mkdirSync(crudModelPath)
    }

    cli.action.stop(`Check Module ${prefix} - [OK]`)

    cli.action.start(`Creando module entidad ${singular(name)}`)

    await GenerateApiCrudModuleEntityModule(name, crudModelPath)

    cli.action.stop(`Module ${singular(name)} [OK]`)

    cli.action.stop(`Entity API ${singular(name)} [OK]`)

    await GenerateApiCrudEntityNSQLModule(prefix, name, crudModelPath)

    cli.action.stop(`Entidad API ${singular(name)} [OK]`)

    cli.action.start(`Creando DTO entidad ${singular(name)}`)

    await GenerateApiCrudDtoModule(prefix, name, crudModelPath)

    cli.action.stop(`DTO entidad ${singular(name)} [OK]`)

    cli.action.start(`Creando Service entidad ${singular(name)}`)

    await GenerateApiCrudServiceModule(name, crudModelPath)

    cli.action.stop(`Service entidad ${singular(name)} [OK]`)

    cli.action.start(`Creando controller entidad ${singular(name)}`)

    await GenerateAPIControllerNSQLModule(name, crudModelPath)

    cli.action.stop(`controller ${singular(name)} [OK]`)

    cli.action.start(`Actualizamos modulo Raiz PREFIX ${prefix}`)

    await UpdateRootNSQLModule(prefix)

    cli.action.stop(`Actualizamos modulo PREFIX ${singular(name)} [OK]`)

    cli.action.start(`Actualizamos API Module`)

    await UpdateRootAPIModuleNSQL()

    cli.action.stop(`Modulo API [OK]`)

  }

  async promptPrefixName() {

    const question: { prefix: string } = await inquirer.prompt([
      {
        name: "prefix",
        message: "Ingrese Prefijo del módulo REST:",
        type: "input"
      }
    ])

    if (question.prefix == '')
      this.proccessRejected('Falta cargar root module name')

    return question.prefix
  }

  async promptName() {

    const question: { name: string } = await inquirer.prompt([
      {
        name: "name",
        message: "Ingrese Entidad del módulo CRUD:",
        type: "input"
      }
    ])

    if (question.name == '')
      this.proccessRejected('Falta cargar root module name')

    return question.name
  }

  proccessRejected(label?: string): void {

    if (label) {
      this.log(label)
    } else {
      this.log('Proceso rechazado. Por un valor incompleto')
    }

    this.exit(0)
  }


}
