import {Command, flags } from "@oclif/command"
import inquirer from "inquirer"

import { mainLogoRestAPI } from "../../core/images/main-graphql"

import {
  NestValueOptionEnum,
  runOptionMySQLInternalLogin
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
          name: "nestjsSelection",
          message: "Please select option",
          choices: [
            NestValueOptionEnum.CRUD_MYSQL_LOGIN_INTERNO,
            NestValueOptionEnum.CRUD_POSTGRES_LOGIN_INTERNO,
            NestValueOptionEnum.CRUD_MYSQL_LOGIN_KEYCLOAK,
            new inquirer.Separator(),
            NestValueOptionEnum.CRUD_MONGODB_LOGIN_INTERNO
          ],
        },
      ])
      .then(async answers => {

        switch (answers.nestjsSelection) {
          case NestValueOptionEnum.CRUD_MYSQL_LOGIN_INTERNO:

            await runOptionMySQLInternalLogin()

            break;
        }
      });
  }
}