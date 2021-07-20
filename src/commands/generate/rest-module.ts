import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import inquirer from "inquirer";
import * as cliProgress from "cli-progress";
import { GenerateRootModule } from "../../core/generate/gql-nsql/root-module.generate";

export class RestModule extends Command {

  static description = 'Generador de Module ROOT API';

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'e', description: 'root module name' }),
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  async run() {

    const { args, flags } = this.parse(RestModule);

    const name: string = flags.name ?? await this.promptName();

    cli.action.start(
      `Generando Modulo...`
    );

    await GenerateRootModule(name);

    cli.action.stop("Proceso Finalizado..");

  }

  async promptName() {

    const question: { name: string } = await inquirer.prompt([
      {
        name: "name",
        message: "Ingrese Prefijo del módulo REST:",
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
