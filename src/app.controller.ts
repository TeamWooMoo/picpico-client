import { Controller, Get, Param, Render } from "@nestjs/common";

@Controller("/")
export class AppController {
  @Get()
  @Render("index")
  getHome() {}

  @Get("/login")
  @Render("index")
  getLogin() {}

  @Get("/lobby/:nickname")
  @Render("index")
  getLobby(@Param() nickname: string) {
    return {'nickname':nickname};
  }
}
