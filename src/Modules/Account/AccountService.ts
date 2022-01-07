import { Account } from "../../entities/Account";
import { IAccount, IAccountRepository, IAccountService } from "./structure";


//Class AccountService - RESPONSÁVEL POR REGRAS DE NEGÓCIO

export default class AccountService implements IAccountService{

    constructor(
        private accountRepository:IAccountRepository
    ){}

    //Método create para criar uma nova conta
    async create({ id, typeAccount, balance, id_idUser }: IAccount): Promise<object | Error> {

        //Verficiar se user já possui conta cadastrada
        if(await this.accountRepository.findById(id_idUser)){
            return new Error ("User already has an account!")
        }
        
        const account = await this.accountRepository.create({
            typeAccount,
            balance,
            id_idUser
        })

        return account

    }

    //Método find para buscar todas as contas existentes
    async find(): Promise<object | Error> {
        const accounts = this.accountRepository.find()
        return accounts
    }

    //Método findById para buscar conta especifica
    async findById(id: string): Promise<Account | Error> {
        const account = await this.accountRepository.findById(id)
        return account
    }

    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(id: string, depositValue: number): Promise<object | Error> {

        const account = await this.accountRepository.findById(id)

        const result = Number(account) + depositValue

        if(result > 5000){
            return new Error("Limit unavailable!")
        }

        const accounts = await this.accountRepository.deposit(id,depositValue)
        return accounts
    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(id: string, withdrawValue: number): Promise< any | Error> {

        const account = await this.accountRepository.findById(id)

        const result = Number(account) - withdrawValue

        if(result < 0){
            return new Error("Insufficient funds!")
        }

        const accounts = await this.accountRepository.withdraw(id,withdrawValue)

        return (accounts)

    }

}