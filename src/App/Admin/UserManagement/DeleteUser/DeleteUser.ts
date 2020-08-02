import axios from 'axios'
import {address} from "../../../utils/ServerConf";

export function deleteUser(username: string, callback: () => void) {
    axios.delete(
        address + `users/${username}`
    ).then(value =>
        callback()
    )
}