import { Router } from "express";
import { AccountRoutes } from "./Modules/Account";
import { UserRoutes } from "./Modules/User";

const mainRoute = Router()

mainRoute.use('/users',UserRoutes)
mainRoute.use('/accounts',AccountRoutes)

export default mainRoute