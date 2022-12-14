import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import Cat from './cat.tdo';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  

  @Get('/?')
  @Render('index')
  async search(@Query('color') color: string) { 
    let cats = await this.appService.getDatas() 
    let colors = await this.appService.getColors()
    let match = []
    if(color == null) {
      match = cats
    } else {
      cats.map(cat=> {
        if(cat.szem_szin.includes(color)) {
          match.push(cat)
        }
      })
    }
    match.sort((a,b) => a.suly-b.suly)
    return {
      cats: match,
      colors
    }
  }

  @Get('/cats/new')
  @Render('newCat')
  newCat() {

  }

  @Post('/cats/new')
  @Redirect()
  async handleNewCatPost(@Body() cat: Cat) {
    
    let result = await this.appService.insertCat(cat)

    return {
      url: '/?'
    }
  }


}
  
