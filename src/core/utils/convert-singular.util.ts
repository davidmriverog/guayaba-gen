import { singular } from "pluralize"

export const customSingular = (word: string) => {
  return singular(word).replace("_", "-");
}