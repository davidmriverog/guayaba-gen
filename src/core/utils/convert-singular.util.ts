import { singular } from "pluralize"
import { camelCase, snakeCase } from "change-case"

export const customSingular = (word: string) => {
  return singular(word).replace("_", "-")
}

export const customPlural = (word: string) => {
  return word.replace("-", "_")
}

export const customSnakePlural = (word: string) => {
  return snakeCase(word)
}

export const customSingularPascalCamelCase = (word: string) => {
  return camelCase(singular(word))
}
