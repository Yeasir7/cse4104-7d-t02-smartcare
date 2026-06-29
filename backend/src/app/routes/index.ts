import { Router } from "express";
import { specialtyRouter } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";

const router = Router()

router.use("/auth", AuthRoutes)
router.use("/specialties", specialtyRouter);

export const indexRoutes = router;