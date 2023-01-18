import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  
  app.useStaticAssets(join(__dirname, "..", "picpico-client/build"));
  app.setBaseViewsDir(join(__dirname, "..", "picpico-client/build"));

  app.engine("html", require("ejs").renderFile);
  app.setViewEngine("html");

  const handleListen = () => console.log("Client Server");
  // await app.listen(3000, handleListen);
  await app.listen(3001, handleListen);
}
bootstrap();
