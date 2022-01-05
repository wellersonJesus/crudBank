import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";




@Entity("users")
export class User{

    @PrimaryColumn()
    id:string

    @Column()
    name:string

    @Column()
    CPF:string

    @Column()
    email:string

    @CreateDateColumn()
    created_at:Date

    //CONSTRUTOR FEITO PARA INSERIR UM NOVO ID ALEATÓRIO EM CASO DE CADASTRO
    constructor(){
        if(!this.id){
            this.id=uuid()
        }
    }

}