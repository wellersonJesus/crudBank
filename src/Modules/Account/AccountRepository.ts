import { Repository } from "typeorm";
import { Account } from "../../entities/Account";
import BaseRepository from "../../utils/BaseRepository";
import { IUser } from "../User/structure";
import { IAccount, IAccountRepository } from "./structure";


export default class AccountRepository
extends BaseRepository<Account>
implements IAccountRepository
{

    getRepo():Repository<Account>{
        return super._getRepo(Account)
    }

    async create({typeAccount,balance,id_idUser}:IAccount):Promise<Account|Error>{
        const account = this.getRepo().create({
            typeAccount,
            balance,
            id_idUser
        })
        await this.getRepo().save(account)
        return account
    }
    
    async find(): Promise<object | Error> {
        const accounts = this.getRepo().find({
            relations:["user"]
        })
        return accounts
    }

    async deposit(id: string, depositValue: number): Promise<any | Error> {
        
        const account = await this.getRepo().findOne(id)

        account.balance = Number(account.balance) + depositValue

        await this.getRepo().save(account)

        return account

    }

    

}


