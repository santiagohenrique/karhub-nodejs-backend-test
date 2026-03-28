import "dotenv/config";
import "reflect-metadata";
import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";
import { join } from "path";
import { DataSource } from "typeorm";

export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? "3306"),
  username: process.env.DB_USERNAME ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "karhub",
  entities: [PartEntity],
  migrations: [join(__dirname, "migrations/*{.ts,.js}")],
  synchronize: false,
});
