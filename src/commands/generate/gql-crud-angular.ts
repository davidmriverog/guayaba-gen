import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"

import cli from "cli-ux"
import inquirer from "inquirer"

import { Command, flags } from "@oclif/command"
import { GenerateRootModule } from "../../core/generate/gql-nsql/root-module.generate"
import { GenerateCrudDtoGQLModule, GenerateCrudEntityGQLModule, GenerateCrudModuleEntityGQLModule, GenerateCrudResolverGQLModule, GenerateCrudServiceGQLModule, getDefaultConfig, UpdateRootHQLModule, UpdateRootModule } from "../../core"

export class GQLCrudAngularModule extends Command {

  static description = 'Generador de Module GRAPHQL - CRUD'

  static flags = {
    help: flags.help({ char: 'h' }),
    prefix: flags.string({ char: 'e', description: 'prefix name' }),
    name: flags.string({ char: 'e', description: 'root module name' }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {

    const defaultAppConfig = getDefaultConfig()

    const { args, flags } = this.parse(GQLCrudAngularModule)

    const prefix: string = flags.prefix ?? await this.promptPrefixName()
    const name: string = flags.name ?? await this.promptName()

    const generatedPath = path.resolve(defaultAppConfig.resultPathGraphql, `./${prefix}`)

    cli.action.start(`Check Module [${prefix}]`)

    if (!fs.existsSync(generatedPath)) {

      await GenerateRootModule(prefix)
    }

    const crudModelPath = path.resolve(generatedPath, `./${singular(name)}`)

    if (!fs.existsSync(crudModelPath)) {
      fs.mkdirSync(crudModelPath)
    }

    cli.action.stop(`Check Module ${prefix} - [OK]`)

    cli.action.start(`Creando entidad ${singular(name)}`)

    await GenerateCrudEntityGQLModule(prefix, name, crudModelPath)

    cli.action.stop(`Entidad ${singular(name)} [OK]`)

    cli.action.start(`Creando dto entidad ${singular(name)}`)

    await GenerateCrudDtoGQLModule(prefix, name, crudModelPath)

    cli.action.stop(`DTO dto entidad ${singular(name)} [OK]`)

    cli.action.start(`Creando service entidad ${singular(name)}`)

    await GenerateCrudServiceGQLModule(name, crudModelPath)

    cli.action.stop(`service entidad ${singular(name)} [OK]`)

    cli.action.start(`Creando resolver entidad ${singular(name)}`)

    await GenerateCrudResolverGQLModule(name, crudModelPath)

    cli.action.stop(`reosolver ${singular(name)} [OK]`)

    cli.action.start(`Creando module entidad ${singular(name)}`)

    await GenerateCrudModuleEntityGQLModule(name, crudModelPath)

    cli.action.stop(`module ${singular(name)} [OK]`)

    cli.action.start(`Actualizamos modulo Raiz ${prefix}`)

    await UpdateRootModule(prefix)

    cli.action.stop(`Actualizamos modulo ${singular(name)} [OK]`)

    cli.action.start(`Actualizamos HQL Module`)

    await UpdateRootHQLModule()

    cli.action.stop(`Modulo HQL [OK]`)

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
