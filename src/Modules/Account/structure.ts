import { Request, Response } from "express";
import { Account } from "../../entities/Account";



export interface IAccount{
    id?:string,
    typeAccount:string,
    balance:number,
    id_idUser:string
}


export interface IAccountRepository{
    create (data:IAccount):Promise<Account|Error>
    find():Promise<object|Error>
    findById(id:string):Promise<Account|Error>
    deposit(id:string,depositValue:number):Promise<object|Error>
    withdraw(id:string,withdrawValue:number):Promise<any|Error>
}

export interface IAccountService{
    create ({id,typeAccount,balance,id_idUser}:IAccount):Promise<object|Error>
    find():Promise<object|Error>
    findById(id:string):Promise<Account|Error>
    deposit(id:string,depositValue:number):Promise<object|Error>
    withdraw(id:string,withdrawValue:number):Promise<any|Error>
}

export interface IAccountController{
    create(req:Request,res:Response):Promise<void>
    find(req:Request,res:Response):Promise<void>
    findById(req:Request,res:Response):Promise<void>
    deposit(req:Request,res:Response):Promise<void>
    withdraw(req:Request,res:Response):Promise<void>
}