import { Request, Response } from "express";
import  Account  from "../../entities/Account";

export interface IAccount{
    id?:string,
    typeAccount:string,
    balance:number,
    id_idUser
}

export interface IBalanceResponse{
    name: string;
    cpf: string;
    balance: number;
}

export interface IAccountRepository{
    create (data:IAccount):Promise<Account|Error>
    find():Promise<object|Error>
    deposit(id:string,depositValue:number):Promise<object|Error>
    withdraw(id:string,withdrawValue:number):Promise<object|Error>
    balance(id:string):Promise<IBalanceResponse|Error>

}

export interface IAccountService{
    create ({id,typeAccount,balance,id_idUser}:IAccount):Promise<object|Error>
    find():Promise<object|Error>
    deposit(id:string,depositValue:number):Promise<object|Error>
    withdraw(id:string,withdrawValue:number):Promise<object|Error>
    balance(id:string):Promise<IBalanceResponse | Error>
}

export interface IAccountController{
    create(req:Request,res:Response):Promise<void>
    find(req:Request,res:Response):Promise<void>
    deposit(req:Request,res:Response):Promise<void>
    withdraw(req:Request,res:Response):Promise<void>
    balance(req:Request,res:Response):Promise<void>
}ba5f1f0b-f871-44e6-b483-0149bd038f1a