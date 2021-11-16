import { DatabaseTable } from "../constants.js";
import { database } from "../database.js";

/**
 * const someModel = models["model_name"]();
 * @typedef { () => import("knex").Knex.QueryBuilder} useModel
 * @type { (Record<string, useModel>)}
 */
export const models = Object.fromEntries(Object.values(DatabaseTable).map((table) => [table, () => database.table(table)]));
