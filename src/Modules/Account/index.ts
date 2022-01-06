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
AccountRoutes.get('/:id',(req,res)=>AccountController.findById(req,res))
AccountRoutes.put('/deposit/:id',(req,res)=>AccountController.deposit(req,res))
AccountRoutes.put('/withdraw/:id',(req,res)=>AccountController.withdraw(req,res))