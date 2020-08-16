import axios from 'axios'
import { address } from "../../../utils/ServerConf"

export function setUserRole(username: string, role: string) {
    axios.put(
        `${address}users/role/${username}`,
        {role},
    ).then(value =>
        {
            console.log(value.data)
        }
    )
}

export function setUserPassword(username: string, password: string) {
    axios.put(
        `${address}users/password/${username}`,
        {password},
    ).then(value =>
        {
            console.log(value.data)
        }
    )
}