import { All, Controller, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  @All()
  //@Redirect('/api')
  index() {}*/

}
