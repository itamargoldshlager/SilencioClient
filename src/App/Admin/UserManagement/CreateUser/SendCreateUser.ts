import axios from 'axios'
import {address} from "../../../utils/ServerConf";
import {UserRowProps} from "../UserTable/UserTableRow";

export function sendCreateUser(user: UserRowProps) {
    axios.post(
        address + 'users',
        user
    )
}