import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async(payLoad: Specialty) : Promise<Specialty> =>{
    const result = prisma.specialty.create({
        data : payLoad
    })
    return result
}

const getAllSpecialty = async() : Promise<Specialty[]> =>{
    const result = prisma.specialty.findMany()
    return result;
}

const deleteSpecialty = async(id : string) : Promise<Specialty> =>{
    const result = prisma.specialty.delete({
        where : {id}
    })
    return result
}

export const specialtyServices = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};