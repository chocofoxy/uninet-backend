import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/role.decorator';
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
    console.log(req.user);  
    return this.timelineService.getTimeline(2);
  }

  @Get('administration')
  administration() {
    return this.timelineService.getTimeline(1);
  }

}
