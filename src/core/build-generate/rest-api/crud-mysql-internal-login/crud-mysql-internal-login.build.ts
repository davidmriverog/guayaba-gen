import inquirer from "inquirer"
import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"

import cli from "cli-ux"

import { getDefaultConfig } from "../../../config/param.config"
import { GenerateRootGrapHQLModule } from "../../common/root-module-graphql.common"
import { GenerateCrudServiceDBRelationalModule } from "../../common/crud-service-entity.common"
import { GenerateCrudEntityRestAPIMySQL } from "./generator/crud-mysql-entity-restapi.generator"
import { GenerateRestAPICrudDtoModule } from "./generator/crud-mysql-dto-restapi.generator"
import { GenerateRestAPIControllerClass } from "./generator/crud-mysql-controller-restapi.generate"
import { GenerateCrudModuleEntityRestAPIModule } from "../../common/crud-module-entity-restapi.common"
import { UpdateRootRestAPIModule } from "../../common/update-root-restapi.common"
import { UpdateRootRestAPIPrefixModule } from "../../common/update-root-module-rest.common"

/**
 * Run Option Generator MySQL internal LOGIN (CRUD) RestAPI.
 *
 * @author David rivero (ErCompa) <davidmriverog@gmail.com>
 */
export async function runOptionMySQLInternalLoginRestAPI() {
  try {

    const defaultAppConfig = getDefaultConfig()

    // prefix
    const questionPrefix: { prefix: string } = await inquirer.prompt([
      {
        name: "prefix",
        message: "Please input entity prefix (module):",
        type: "input"
      }
    ])

    // name
    const questionName: { name: string } = await inquirer.prompt([
      {
        name: "name",
        message: "Please input entity name (table):",
        type: "input"
      }
    ])

    if (questionPrefix.prefix == "")
      throw new Error("Field prefix is required")

    if (questionName.name == "")
      throw new Error("Field name is required")

    const prefix = questionPrefix.prefix
    const entityName = questionName.name

    if (!fs.existsSync(defaultAppConfig.resultPathApi)) {

      fs.mkdirSync(defaultAppConfig.resultPathApi)
    }

    const generatedPath = path.resolve(defaultAppConfig.resultPathApi, `./${prefix}`)

    // 1) ROOT MODULE ENTITY PREFIX
    cli.action.start(`Check Prefix Module [${prefix}]`)

    if (!fs.existsSync(generatedPath)) await GenerateRootGrapHQLModule(prefix)

    const crudModelPath = path.resolve(generatedPath, `./${singular(entityName)}`)

    if (!fs.existsSync(crudModelPath)) {
      fs.mkdirSync(crudModelPath)
    }

    cli.action.stop(`Module ${prefix} - Checked [OK]`)

    // 2) CREATE ENTITY
    cli.action.start(`Creating Entity ${singular(entityName)}`)

    await GenerateCrudEntityRestAPIMySQL(entityName, crudModelPath)

    cli.action.stop(`Entity ${singular(entityName)} Created Successful! [OK]`)

    // 3) CREATE DTO AND OBJECT TYPES
    cli.action.start(`Creating DTO Entity ${singular(entityName)}`)

    await GenerateRestAPICrudDtoModule(entityName, crudModelPath)

    cli.action.stop(`Entity DTO ${singular(entityName)} Created Successful! [OK]`)

    // 4) CREATE SERVICES
    cli.action.start(`Creating Service Entity ${singular(entityName)}`)

    await GenerateCrudServiceDBRelationalModule(entityName, crudModelPath)

    cli.action.stop(`Entity Service ${singular(entityName)} Created Successful! [OK]`)

    // 5) CREATE CONTROLLER
    cli.action.start(`Creating Controller Entity ${singular(entityName)}`)

    await GenerateRestAPIControllerClass(entityName, crudModelPath)

    cli.action.stop(`Entity Controller ${singular(entityName)} Created Successful! [OK]`)

    // 6) CREATE ENTITY MODULE
    cli.action.start(`Creating Module Entity ${singular(entityName)}`)

    await GenerateCrudModuleEntityRestAPIModule(entityName, crudModelPath)

    cli.action.stop(`Entity Module ${singular(entityName)} Created Successful! [OK]`)

    // 7) UPDATE ROOT MODULES
    cli.action.start(`Update Root Module prefix [${prefix}]`)

    await UpdateRootRestAPIPrefixModule(prefix)

    cli.action.stop(`Root Module Prefix [${prefix}] Updated Successful! [OK]`)

    // 8) UPDATE RestAPI MODULES
    cli.action.start(`Update RestAPI Module`)

    await UpdateRootRestAPIModule()

    cli.action.stop(`HQL RestAPI Updated Successful! [OK]`)

  } catch (error) {
    console.log(error)
  }
}