import { Repository } from "typeorm";
import User from "../../entities/User";
import BaseRepository from "../../utils/BaseRepository";
import { IUser, IUserRepository } from "./structure";

export default class UserRepository
extends BaseRepository<User>
implements IUserRepository
{
    getRepo():Repository<User>{
        return super._getRepo(User)
    }

    async create({ name, CPF, email}:IUser):Promise<User|Error>{

        const user = this.getRepo().create({
            name,
            CPF,
            email

        })

        await this.getRepo().save(user)

        return user

    }

    async find(): Promise<object | Error> {
        const users = await this.getRepo().find()
        return users
    }

    async findById(id: string): Promise<any | Error> {
        const user = await this.getRepo().findOne({id})
        return user.email
    }

    async findCPF(CPF: string): Promise<any | Error> {
        const user = await this.getRepo().findOne({CPF})
        return user
    }
            
    //let: Variavel muda de valor dentro do mesmo metodo
    //const: Variavel constante NÃO muda de valor
    //var: Variavel muda de valor
        
    async delete(id: string): Promise<void | Error> {
        const result = await this.getRepo().delete(id)
        let resp
        
        if (result){
            resp = "User deleted success!!"
            return resp 
        }else{
            resp = "User not deleted"
            return resp
        }
    }

    async update(id: string, name?: string, CPF?: string, email?: string, ) {
        
        const user = await this.getRepo().update(id,{
            name,
            CPF,
            email

        })

        return user

    }

}