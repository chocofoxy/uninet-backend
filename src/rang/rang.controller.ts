import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RangService } from './rang.service';
import { CreateRangDto } from './dto/create-rang.dto';

@Controller('rang')
export class RangController {
  constructor(private readonly rangService: RangService) {}

  @Post()
  create(@Body() createRangDto: CreateRangDto) {
    return this.rangService.create(createRangDto);
  }

  @Get()
  findAll() {
    return this.rangService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { populated: await this.rangService.findOne(id) , raw: await this.rangService.findOneRaw(id) }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rangService.remove(id);
  }
}
