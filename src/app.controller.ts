import { Controller, Get, Render } from "@nestjs/common";

@Controller("/")
export class AppController {
  @Get()
  @Render("index")
  getHome() {}

  @Get("/login")
  @Render("index")
  getLogin() {}

  @Get("/lobby")
  @Render("index")
  getLobby() {}
}
