import axios from 'axios'
import {address} from "../../../utils/ServerConf";
import {UserRowProps} from "../UserTable/UserTableRow";

export function createUser(user: UserRowProps) {
    axios.post(
        address + 'users',
        user
    )
}