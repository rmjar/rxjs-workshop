import { Controller, Get, Query, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { from, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api/wikipedia')
  wiki(@Query('search') search: string) {
    if (search.length > 14) {
      return throwError({ title: 'fake error for ' + search });
    }
    return of([
      { title: 'Found title 1 for ' + search },
      { title: 'Found title 2 for ' + search },
      { title: 'Found title 3 for ' + search }
    ]).pipe(delay(4000));
  }

  @Get('api')
  getData(@Query() name): string {
    return;
  }

  @Get('api/long')
  long() {
    return of({
      id: 1,
      name: 'Piotr',
      category: 44
    }).pipe(delay(4000));
  }

  @Get('api/user')
  getuser() {
    return {
      id: 1,
      name: 'Piotr',
      category: 44
    };
  }

  @Get('api/category/:id')
  getCategory(@Param('id') id) {
    return {
      id,
      name: 'category of: ' + id
    };
  }

  @Get('api/parse')
  parse() {
    return {
      action: 'create'
    };
  }

  @Get('api/create')
  create() {
    return of({
      message: 'record created'
    }).pipe();
  }
}

/**
  @Get('api/wikipedia')
  wiki(@Query('search') search: string) {
    if (search.length > 4) {
      return throwError({title: 'fake error for ' + search});
    }
    return of([
      {title: 'Fount title 1 for ' + search},
      {title: 'Fount title 2 for ' + search},
      {title: 'Fount title 3 for ' + search}
    ]);
  }


 */
