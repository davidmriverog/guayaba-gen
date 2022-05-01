import {Command, flags } from "@oclif/command"
import inquirer from "inquirer"

import { mainLogoRestAPI } from "../../core/images/main-graphql"

import {
  NestValueOptionEnum,
  runOptionMySQLInternalLoginRestAPI
} from "../../core"

export class NestCrudGrapHQLModule extends Command {

  static description = "Master CRUD API Generator"

  static flags = {
    help: flags.help({ char: "h" })
  }

  static args = [{ name: "file" }]

  async run() {
    mainLogoRestAPI()

    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "selection",
          message: "Please select option",
          choices: [
            NestValueOptionEnum.CRUD_MYSQL_LOGIN_INTERNO
          ],
        },
      ])
      .then(async answers => {

        switch (answers.selection) {
          case NestValueOptionEnum.CRUD_MYSQL_LOGIN_INTERNO:

            await runOptionMySQLInternalLoginRestAPI()

            break;
        }
      });
  }
}