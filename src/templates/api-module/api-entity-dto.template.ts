import * as changeCase from "change-case";
import { singular } from "pluralize";

export const CrudApiDtoTemplate = (entityName: string) => {

  const pascalEntity = changeCase.pascalCase(entityName);

  return `
    import { IsNotEmpty } from 'class-validator';

    export class ${singular(pascalEntity)}Dto {
        
    }

  `;
};
