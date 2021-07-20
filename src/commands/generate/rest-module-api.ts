import * as fs from "fs";
import * as path from "path";

import cli from "cli-ux";
import inquirer from "inquirer";

import { Command, flags } from "@oclif/command";
import { GenerateRootModule } from "../../core/generate/gql-nsql/root-module.generate";
import { GenerateCrudEntityModule, getDefaultConfig } from "../../core";
import { singular } from "pluralize";

export class RestCrudApiModule extends Command {

  static description = 'Generador de Module ROOT API REST';

  static flags = {
    help: flags.help({ char: 'h' }),
    prefix: flags.string({ char: 'e', description: 'prefix name' }),
    name: flags.string({ char: 'e', description: 'root api module name' }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {

    const defaultAppConfig = getDefaultConfig();

    const { args, flags } = this.parse(RestCrudApiModule);

    const prefix: string = flags.prefix ?? await this.promptPrefixName();
    const name: string = flags.name ?? await this.promptName();

    const generatedPath = path.resolve(defaultAppConfig.resultPathGraphql, `./${prefix}`);

    cli.action.start(`Check API Module [${prefix}]`);

    if (!fs.existsSync(generatedPath)) {

      await GenerateRootModule(prefix);
    }

    const crudModelPath = path.resolve(generatedPath, `./${singular(name)}`);

    if (!fs.existsSync(crudModelPath)) {
      fs.mkdirSync(crudModelPath);
    }

    cli.action.stop(`Check Module API ${prefix} - [OK]`);

    cli.action.start(`Creando entidad ${singular(name)}`);

    await GenerateCrudEntityModule(prefix, name, crudModelPath);

  }

  async promptPrefixName() {

    const question: { prefix: string } = await inquirer.prompt([
      {
        name: "prefix",
        message: "Ingrese Prefijo del módulo REST:",
        type: "input"
      }
    ]);

    if (question.prefix == '')
      this.proccessRejected('Falta cargar root module name');

    return question.prefix;
  }

  async promptName() {

    const question: { name: string } = await inquirer.prompt([
      {
        name: "name",
        message: "Ingrese Entidad del módulo CRUD:",
        type: "input"
      }
    ]);

    if (question.name == '')
      this.proccessRejected('Falta cargar root module name');

    return question.name;
  }

  proccessRejected(label?: string): void {

    if (label) {
      this.log(label);
    } else {
      this.log('Proceso rechazado. Por un valor incompleto');
    }

    this.exit(0);
  }


}
