import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "@/src/app.controller";
import { PartsModule } from "@/src/domain/parts/parts.module";
import { DatabaseModule } from "@/src/infra/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || "development"}`, ".env"],
    }),
    DatabaseModule,
    PartsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
