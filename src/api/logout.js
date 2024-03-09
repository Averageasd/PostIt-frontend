import {baseUrl} from "../apiConstants.js";

export async function logout(){
    try{
        await fetch(`${baseUrl}/user/logout`);
    }
    catch (e){
        throw new Error(e);
    }
}