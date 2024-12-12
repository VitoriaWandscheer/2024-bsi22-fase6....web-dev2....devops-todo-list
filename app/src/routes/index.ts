import { Router, json } from "express"
import userRouter from "./user"
const router = Router()
router.use(json())
router.get("/", (req, res) => { res.send("Bom dia!") })
router.use("/user", userRouter)
export default router