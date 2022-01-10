import User from "../../entities/User";
import Account from "../../entities/Account";
import { IUser, IUserRepository, IUserService } from "./structure";
import { ReplSet } from "typeorm";

export default class userService implements IUserService {

    constructor(
        private userRepository: IUserRepository
    ) { }


    // getServ():Service<User>{
    //     return super._getService(User)
    // }    

    async create({ id, name, CPF, email, }: IUser): Promise<object | Error> {

    //REGRA DE NEGOCIO USUARIO JÁ CADASTRADO
    // const result = await this.getServ().create(CPF)
    //     let resp

    //     if (result) {
    //         resp = "User deleted success!!"
    //         return resp
    //     } else {
    //         resp = "User not deleted"
    //         return resp
    //     }
    // }



    const user = await this.userRepository.create({
        name,
        CPF,
        email
    })

        return user

    }

    async find(): Promise < object | Error > {

    const user = await this.userRepository.find()

        return user

}

    async findById(id: string): Promise < User | Error > {
    const user = await this.userRepository.findById(id)
        return user
}

    async delete (id: string): Promise < void | Error > {
    const result = await this.userRepository.delete(id)
        return result
}

    async update(id: string, name ?: string, CPF ?: string, email ?: string,): Promise < object | Error > {

    const user = await this.userRepository.update(id, name, CPF, email)

        return user

}
}
