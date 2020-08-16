import axios from 'axios'
import {address} from "../../../utils/ServerConf";
import {UserRowProps} from "../UserTable/UserTableRow";

export function sendCreateUser(userDetails: UserRowProps, onSuccess: () => void, onFailure: () => void) {
    axios.post(
        address + 'users',
        userDetails
    ).then(value => {
        value.data ? onSuccess(): onFailure();
    })
}