import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./User";

@Entity("accounts")
export default class Account{

    @PrimaryColumn()
    id:string

    @Column()
    typeAccount:string

    @Column()
    balance:number

    @Column()
    id_idUser:string

    @OneToOne(()=>User, account => Account )
    @JoinColumn({name:"id_idUser"})
    user: User

    @CreateDateColumn()
    created_at:Date

    constructor(){
        if(!this.id){
            this.id=uuid()
        }
    }
}