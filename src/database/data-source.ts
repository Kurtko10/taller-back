import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// -----------------------------------------------------------------------------

dotenv.config();

export const dataSource = new DataSource({
   type: "mysql",
   host: process.env.DB_HOST,
   //host:"localhost",
   port: Number(process.env.DB_PORT),
   //port:3307,
   username: process.env.DB_USER,
   //username:"root",
   password: process.env.DB_PASSWORD,
   //password:"root",
   database: process.env.DB_DATABASE,
   //database:"taller",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
});