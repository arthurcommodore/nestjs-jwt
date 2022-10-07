import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStamp } from 'console';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {

    
    constructor(
        @InjectRepository(UsersEntity) 
        private readonly usersRepository: Repository<UsersEntity>
    ){}
    

    async findAll(){

        return await this.usersRepository.find({select: ["id", "firstName", "lastName", "email"]});
    }

    async findOneBy(options) {
        try {

            return await this.usersRepository.findOneBy(options);
        }catch(e) {

            throw new NotFoundException(e.menssage);
        }
    }


    async store(data: CreateUserDto) {

        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {

        const user = await this.findOneBy({ id });
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }

    async destroy(id: string){

        await this.usersRepository.delete({id});
    }
}
