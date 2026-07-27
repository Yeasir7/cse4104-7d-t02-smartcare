import { Router } from "express";
import { specialtyRouter } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { userRouter } from "../module/user/user.route";
import { doctorRouter } from "../module/doctor/doctor.route";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/specialties", specialtyRouter);
router.use("/users", userRouter)
router.use("/doctor", doctorRouter)

export const indexRoutes = router;