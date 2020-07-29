import axios from "axios"
import {address} from "../../../utils/ServerConf";

export function fetchUsers(callback: (data: any) => void) {
    axios.get(address + 'users')
        .then(value => {
            callback(value.data)
        }
    )
}