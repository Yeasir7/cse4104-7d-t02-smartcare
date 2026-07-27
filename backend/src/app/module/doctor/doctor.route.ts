import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router()

router.get("/", doctorController.getAllDoctor)
router.get("/:id", doctorController.getDoctorById)
router.delete("/:id", doctorController.deleteDoctor)
router.patch("/:id", validateRequest(updateDoctorZodSchema) ,doctorController.updateDoctor)

export const doctorRouter = router; 