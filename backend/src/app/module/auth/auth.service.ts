import { auth } from "../../lib/auth";

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
        throw new Error("failed to register")
    }
    return data;
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