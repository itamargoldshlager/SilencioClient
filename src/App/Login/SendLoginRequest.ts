import axios from "axios"
import {address} from "../utils/ServerConf";

export function sendLoginRequest(username: string, password: string, callback: (result: string) => void) {
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