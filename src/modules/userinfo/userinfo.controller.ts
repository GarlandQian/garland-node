import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';

@Controller('userinfo')
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @Post()
  create(@Body() createUserinfoDto: CreateUserinfoDto) {
    return this.userinfoService.create(createUserinfoDto);
  }

  @Get()
  findAll() {
    return this.userinfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userinfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserinfoDto: UpdateUserinfoDto) {
    return this.userinfoService.update(+id, updateUserinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userinfoService.remove(+id);
  }
}
