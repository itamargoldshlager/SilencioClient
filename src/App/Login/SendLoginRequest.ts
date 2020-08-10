import axios from "axios"
import {address} from "../utils/ServerConf";

export interface loginResponse {
    personId: string,
    role: string
}
export function sendLoginRequest(
    username: string,
    password: string,
    callback: (result: loginResponse) => void
){
    axios.post(
        address + 'users/auth',
        {
            username,
            password
        }
    ).then(value => {
        callback(value.data);
    });
}