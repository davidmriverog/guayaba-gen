import { singular } from "pluralize";
import { camelCase } from "change-case";

export const customSingular = (word: string) => {
  return singular(word).replace("_", "-");
}

export const customSingularPascalCamelCase = (word: string) => {
  return camelCase(singular(word));
}
