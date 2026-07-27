import status from "http-status";
import { Role, Specialty } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payLoad: ICreateDoctorPayload) => {
  const specialties: Specialty[] = [];

  for (const specialtyId of payLoad.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });
    if (!specialty) {
      throw new AppError(
        status.NOT_FOUND,
        "Specialty with ${specialtyId} not found",
      );
    }
    specialties.push(specialty);
  }

  const existUser = await prisma.user.findUnique({
    where: {
      email: payLoad.doctor.email,
    },
  });
  if (existUser) {
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }

  const userData = await auth.api.signUpEmail({
    body: {
      email: payLoad.doctor.email,
      password: payLoad.password,
      role: Role.DOCTOR,
      name: payLoad.doctor.name,
      needPasswordChange: true,
    },
  });
  try {
    const result = await prisma.$transaction(async(tx)=>{
        const doctorData = await tx.doctor.create({
          data: {
            userId : userData.user.id,
            ...payLoad.doctor
          },
        });
        const DoctorSpecialtyData = specialties.map((specialty) => {
          return {
            doctorId : doctorData.id,
            specialtyId: specialty.id,
          }
        })
        await tx.doctorSpecialty.createMany({
          data: DoctorSpecialtyData
        })
        const doctor = await tx.doctor.findUnique({
          where: {
            id: doctorData.id,
          },
          select: {
            id: true,
            userId: true,
            name: true,
            email: true,
            profilePhoto: true,
            contactNumber: true,
            address: true,
            registrationNumber: true,
            experience: true,
            gender: true,
            appointmentFee: true,
            qualification: true,
            currentWorkingPlace: true,
            designation: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                emailVerified: true,
                image: true,
                isDeleted: true,
                deletedAt: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            Specialties:{
              select: {
                specialty:{
                  select:{
                    title: true,
                    id: true
                  }
                }
              }
            }
          },
        });
        return doctor;
    })
    return result
  } catch (error) {
    console.log("transaction error", error);
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw error;
  }
};

export const userServices = {
  createDoctor,
};
