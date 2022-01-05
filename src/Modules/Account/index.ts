import { Router } from "express";
import AccountControllerClass from "./AccountController";
import AccountRepositoryClass from "./AccountRepository";
import AccountServiceClass from "./AccountService";

export const AccountRepository = new AccountRepositoryClass()
export const AccountService = new AccountServiceClass(AccountRepository)
export const AccountController = new AccountControllerClass(AccountService)

export const AccountRoutes = Router()

AccountRoutes.post('/',(req,res)=>AccountController.create(req,res))
AccountRoutes.get('/',(req,res)=>AccountController.find(req,res))
AccountRoutes.put('/:id',(req,res)=>AccountController.deposit(req,res))