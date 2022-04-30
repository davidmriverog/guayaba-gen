import {Command, flags } from "@oclif/command"
import { mainLogoGrapHQL } from "../../core/images/main-graphql"
import cli from "cli-ux"
import inquirer from "inquirer"
import { NestValueOptionEnum, runOptionMySQLInternalLogin } from "../../core"

export class NestCrudGrapHQLModule extends Command {

  static description = "Master Generator GrapHQL"

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
          name: "nestjsSelection",
          message: "Por favor elija",
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
          case NestValueOptionEnum.CRUD_POSTGRES_LOGIN_INTERNO:

            break;
        }
      });
  }
}