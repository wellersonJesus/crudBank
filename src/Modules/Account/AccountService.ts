import { IAccount, IAccountRepository, IAccountService } from "./structure";



export default class AccountService implements IAccountService{

    constructor(
        private accountRepository:IAccountRepository
    ){}

    async create({ id, typeAccount, balance, id_idUser }: IAccount): Promise<object | Error> {
        
        const account = await this.accountRepository.create({
            typeAccount,
            balance,
            id_idUser
        })

        return account

    }

    async find(): Promise<object | Error> {
        const accounts = this.accountRepository.find()
        return accounts
    }

    async deposit(id: string, depositValue: number): Promise<object | Error> {

        const accounts = await this.accountRepository.deposit(id,depositValue)
        return accounts
    }

    async withdraw(id: string, withdrawValue: number): Promise<object | Error> {

        const accounts = await this.accountRepository.withdraw(id,withdrawValue)
        return accounts

    }

}