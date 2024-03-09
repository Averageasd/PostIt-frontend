import {baseUrl} from "../apiConstants.js";
import {getFormElements} from "../helper/formDataParser.js";

export async function signup(data) {
    try {
        const auth = await fetch(
            `${baseUrl}/user/signup`,{
                headers: { 'Content-Type': 'application/json'},
                method:"POST",
                mode:"cors",
                body: JSON.stringify(getFormElements(data))
            }
        );
        return await auth.json();
    } catch (e) {
        throw new Error(e);
    }
}
