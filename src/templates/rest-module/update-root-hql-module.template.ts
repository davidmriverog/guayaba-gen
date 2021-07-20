import * as changeCase from "change-case";
import * as fs from "fs";
import * as path from "path";
import * as _ from 'lodash';

export const UpdateRootHQLModuleTemplate = (pathFile: string) => {

  const moduleEntityImports: Array<string> = new Array<string>();
  const modulePascalEntityImports: Array<string> = new Array<string>();

  const files = fs.readdirSync(pathFile);

  const sortFiles = _.sortBy(files);

  sortFiles.map((file) => {

    const directory = path.join(pathFile, file);

    if (fs.statSync(directory).isDirectory()) {

      modulePascalEntityImports.push(`${changeCase.pascalCase(file)}Module`);
      moduleEntityImports.push(`import { ${changeCase.pascalCase(file)}Module } from './${file}/${file}.module';`);
    }

  })


  return `
    import { Module } from '@nestjs/common';

    ${moduleEntityImports.join("")}

    @Module({
        imports: [
            ${modulePascalEntityImports}
        ]
    })
    export class HQLModule { }
  `;
};