import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async index(){

        console.log("testando")
        return await this.usersService.findAll();
    }

    @Post()
    async store(@Body() body: CreateUserDto) {

        return await this.usersService.store(body);
    }

    @Get(":id")
    async show(@Param("id") id: string) {

        console.log(id)
        return this.usersService.findOneBy({id});
    }

    @Put(":id")
    async update(@Param("id", new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto){

        return this.usersService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param("id", new ParseUUIDPipe()) id: string){

        await this.usersService.destroy(id);
    }

}
