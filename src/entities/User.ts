import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import  Account from "./Account"

@Entity("users")
export default class User{

    @PrimaryColumn()
    id:string

    @Column()
    name:string

    @Column()
    CPF:string

    @Column()
    email:string

    @OneToOne(()=>Account, user => User )
    @JoinColumn({name:"id_idAccount"})
    account: Account
    
    @CreateDateColumn()
    created_at:Date

    //CONSTRUTOR FEITO PARA INSERIR UM NOVO ID ALEATÓRIO EM CASO DE CADASTRO
    constructor(){
        if(!this.id){
            this.id=uuid()
        }
    }

}