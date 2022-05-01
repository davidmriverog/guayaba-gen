import {Command, flags } from "@oclif/command"
import inquirer from "inquirer"

import { mainLogoGrapHQL } from "../../core/images/main-graphql"

import {
  NestValueOptionEnum,
  runOptionMongoDBInternalLogin,
  runOptionMySQLInternalLogin,
  runOptionMySQLKeycloakLogin,
  runOptionPostgreSQLInternalLogin
} from "../../core"

export class NestCrudGrapHQLModule extends Command {

  static description = "Master CRUD API Generator"

  static flags = {
    help: flags.help({ char: "h" })
  }

  static args = [{ name: "file" }]

  async run() {
    mainLogoGrapHQL()

    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "selection",
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

        switch (answers.selection) {
          case NestValueOptionEnum.CRUD_MYSQL_LOGIN_INTERNO:

            await runOptionMySQLInternalLogin()

            break;
          case NestValueOptionEnum.CRUD_POSTGRES_LOGIN_INTERNO:

            await runOptionPostgreSQLInternalLogin()

            break;
          case NestValueOptionEnum.CRUD_MYSQL_LOGIN_KEYCLOAK:

            await runOptionMySQLKeycloakLogin()

            break;
          case NestValueOptionEnum.CRUD_MONGODB_LOGIN_INTERNO:

            await runOptionMongoDBInternalLogin()

            break;
        }
      });
  }
}