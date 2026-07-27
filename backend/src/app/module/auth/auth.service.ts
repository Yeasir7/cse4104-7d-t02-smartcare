import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    email : string,
    name : string,
    password : string
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
    const {name, email, password} = payload;

    const data = await auth.api.signUpEmail({
        body : {
            name,
            email, 
            password
        }
    })
    if(!data.user){
        throw new AppError(status.BAD_REQUEST, "failed to register patient")
    }
    // console.log(data);
    try{
        const patient = await prisma.$transaction(async (tx) => {
          const txPatient = await tx.patient.create({
            data: {
              userId: data.user.id,
              name,
              email,
            },
          });
          return txPatient;
        });
        return {
          ...data,
          patient,
        };
    }catch(error){
        console.log("Transaction error",error);
        await prisma.user.delete({
            where:{
                id : data.user.id
            }
            
        })
        throw error;
    }
};

interface ILoginUserPayload {
    email : string,
    password : string
}

const loginUser = async(payload: ILoginUserPayload) =>{
    const {email, password}= payload
    const data = await auth.api.signInEmail({
        body:{
            email,
            password
        }
    })
    return data;
} 

export const authServices = {
    registerPatient, loginUser
}