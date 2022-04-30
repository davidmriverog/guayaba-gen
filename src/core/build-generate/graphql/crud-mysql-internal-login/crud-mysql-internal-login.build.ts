import inquirer from "inquirer"
import * as fs from "fs"
import * as path from "path"
import { singular } from "pluralize"

import cli from "cli-ux"

import { getDefaultConfig } from "../../../config/param.config"
import { GenerateRootGrapHQLModule } from "../../common/root-module-graphql.common"
import { GenerateCrudEntityGrapHQLMySQL } from "./generator/crud-mysql-entity-graphql.generator"
import { GenerateCrudDtoGrapHQLModule } from "../../common/crud-dto-graphql.common"
import { GenerateCrudServiceDBRelationalModule } from "../../common/crud-service-entity.common"
import { GenerateCrudModuleEntityGrapHQLModule } from "../../common/crud-module-entity-graphql.common"
import { UpdateRootNestModule } from "../../common/update-root-module.common"
import { UpdateRootGrapHQLModule } from "../../common/update-root-graphql.common"
import { GenerateCrudResolverInternalLoginModule } from "../../common/crud-resolver-login-internal.common"

/**
 * Run Option Generator MySQL internal LOGIN (CRUD).
 *
 * @author David rivero (ErCompa) <davidmriverog@gmail.com>
 */
export async function runOptionMySQLInternalLogin() {
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

    if (!fs.existsSync(defaultAppConfig.resultPathGraphql)) {

      fs.mkdirSync(defaultAppConfig.resultPathGraphql)
    }

    const generatedPath = path.resolve(defaultAppConfig.resultPathGraphql, `./${prefix}`)

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

    await GenerateCrudEntityGrapHQLMySQL(entityName, crudModelPath)

    cli.action.stop(`Entity ${singular(entityName)} Created Successful! [OK]`)

    // 3) CREATE DTO AND OBJECT TYPES
    cli.action.start(`Creating DTO Entity ${singular(entityName)}`)

    await GenerateCrudDtoGrapHQLModule(entityName, crudModelPath)

    cli.action.stop(`Entity DTO ${singular(entityName)} Created Successful! [OK]`)

    // 4) CREATE SERVICES
    cli.action.start(`Creating Service Entity ${singular(entityName)}`)

    await GenerateCrudServiceDBRelationalModule(entityName, crudModelPath)

    cli.action.stop(`Entity Service ${singular(entityName)} Created Successful! [OK]`)

    // 5) CREATE RESOLVER
    cli.action.start(`Creating Resolver Entity ${singular(entityName)}`)

    await GenerateCrudResolverInternalLoginModule(entityName, crudModelPath)

    cli.action.stop(`Entity Resolver ${singular(entityName)} Created Successful! [OK]`)

    // 6) CREATE ENTITY MODULE
    cli.action.start(`Creating Module Entity ${singular(entityName)}`)

    await GenerateCrudModuleEntityGrapHQLModule(entityName, crudModelPath)

    cli.action.stop(`Entity Module ${singular(entityName)} Created Successful! [OK]`)

    // 7) UPDATE ROOT MODULES
    cli.action.start(`Update Root Module prefix [${prefix}]`)

    await UpdateRootNestModule(prefix)

    cli.action.stop(`Root Module Prefix [${prefix}] Updated Successful! [OK]`)

    // 8) UPDATE HQL MODULES
    cli.action.start(`Update HQL Module`)

    await UpdateRootGrapHQLModule()

    cli.action.stop(`HQL Module Updated Successful! [OK]`)

  } catch (error) {
    console.log(error)
  }
}