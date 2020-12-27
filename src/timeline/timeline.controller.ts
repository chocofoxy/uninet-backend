import { Controller, Get, Req } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get()
  findAll() {
    return this.timelineService.findAll();
  }

  @Get('general')
  general(@Req() req ){
    return this.timelineService.getTimeline(2);
  }

  @Get('administration')
  administration() {
    return this.timelineService.getTimeline(1);
  }

}
