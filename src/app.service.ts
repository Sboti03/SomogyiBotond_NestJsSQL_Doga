import { Injectable } from '@nestjs/common';
import Cat from './cat.tdo';
import Color from './color.tdo';
import db from './db';

@Injectable()
export class AppService {
  async getDatas() {
    const [rows] = await db.execute('SELECT * FROM macskak');

    let cats = rows as Cat[]
    return cats
  }

  async getColors() {
    const [rows] = await db.execute('SELECT szem_szin FROM macskak GROUP BY szem_szin ORDER BY szem_szin');
    return rows as Color[]
  }

  async insertCat(cat: Cat) {
    const [rows] : any = await db.execute('INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',
    [cat.suly, cat.szem_szin])

    return rows

  }

}
