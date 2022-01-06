import { User } from "../../entities/User";
import { IUser, IUserRepository, IUserService } from "./structure";


export default class userService implements IUserService{

    constructor(
        private userRepository:IUserRepository
    ){}

    async create({ id, name, CPF, email }: IUser): Promise<object | Error> {

        if(await this.userRepository.findById(CPF)){
            return new Error ("User already exist!")
        }
        
        const user = await this.userRepository.create({
            name,
            CPF,
            email
        })

        return user

    }

    async find(): Promise<object | Error> {
        
        const user = await this.userRepository.find()

        return user

    }

    async findById(id: string): Promise<User | Error> {
        const user = await this.userRepository.findById(id)
        return user
    }

    async delete(id: string): Promise<void | Error> {
        await this.userRepository.delete(id)
    }

    async update(id: string, name?: string, CPF?: string, email?: string): Promise<object | Error> {
        
        const user = await this.userRepository.update(id,name,CPF,email)

        return user

    }

}