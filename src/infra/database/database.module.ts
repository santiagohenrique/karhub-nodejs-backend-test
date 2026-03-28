import { PartEntity } from "@/src/domain/parts/entities/typeorm/part.entity";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>("NODE_ENV", "development");
        const isDevelopment = nodeEnv === "development";

        return {
          type: "mysql",
          host: configService.get<string>("DB_HOST", "localhost"),
          port: Number(configService.get<string>("DB_PORT", "3306")),
          username: configService.get<string>("DB_USERNAME", "root"),
          password: configService.get<string>("DB_PASSWORD", ""),
          database: configService.get<string>("DB_DATABASE", "karhub"),
          entities: [PartEntity],
          migrations: [
            join(__dirname, "../persistence/typeorm/migrations/*{.ts,.js}"),
          ],
          synchronize: false,
          migrationsRun: isDevelopment,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
