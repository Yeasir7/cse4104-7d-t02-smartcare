import { prisma } from "../../lib/prisma"
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctor = async() =>{
    const result = await prisma.doctor.findMany({
        include:{
            user: true,
            Specialties: {
                include: {
                    specialty: true,
                }
            }
        }
    })
    return result
}

const getDoctorById = async (id: string) => {
  const result = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      Specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return result;
};

const deleteDoctor = async (id: string) => {
  const result = await prisma.doctor.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const result = await prisma.doctor.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const doctorServices = {
  getAllDoctor,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
};