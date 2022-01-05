import { Router } from "express";
import UserControllerClass from "./UserController";
import UserRepositoryClass from "./UserRepository";
import userServiceClass from "./UserService";

export const UserRepository = new UserRepositoryClass()
export const UserService = new userServiceClass(UserRepository)
export const UserController = new UserControllerClass(UserService)

export const UserRoutes = Router()


UserRoutes.post('/',(req,res)=>UserController.create(req,res))
UserRoutes.get('/',(req,res)=>UserController.find(req,res))
UserRoutes.get('/:id',(req,res)=>UserController.findById(req,res))
UserRoutes.delete('/:id',(req,res)=>UserController.delete(req,res))
UserRoutes.put('/:id',(req,res)=>UserController.update(req,res))


