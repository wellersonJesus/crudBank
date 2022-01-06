import { Repository } from "typeorm";
import { Account } from "../../entities/Account";
import BaseRepository from "../../utils/BaseRepository";
import { IUser } from "../User/structure";
import { IAccount, IAccountRepository } from "./structure";

//Class AccountRepository - RESPONSÁVEL PELA RELAÇÃO COM O BANCO DE DADOS

export default class AccountRepository
extends BaseRepository<Account>
implements IAccountRepository
{

    getRepo():Repository<Account>{
        return super._getRepo(Account)
    }

    //Método create para criar uma nova conta
    async create({typeAccount,balance,id_idUser}:IAccount):Promise<Account|Error>{
        const account = this.getRepo().create({
            typeAccount,
            balance,
            id_idUser
        })
        await this.getRepo().save(account)
        return account
    }
    
    //Método find para buscar todas as contas existentes
    async find(): Promise<object | Error> {
        const accounts = this.getRepo().find({
            relations:["user"]
        })
        return accounts
    }

    //Método findById para buscar conta especifica
    async findById(id: string): Promise<Account | Error> {
        
        const id_idUser = id

        const account = await this.getRepo().findOne({id_idUser})
        return account

    }

    
    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(id: string, depositValue: number): Promise<any | Error> {
        
        const account = await this.getRepo().findOne(id)

        account.balance = Number(account.balance) + depositValue

        await this.getRepo().save(account)

        return account

    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(id: string, withdrawValue: number): Promise<any | Error> {
        
        const account = await this.getRepo().findOne(id)

        account.balance = Number(account.balance) - withdrawValue
        
        await this.getRepo().save(account)

        return account

    }

    

}


