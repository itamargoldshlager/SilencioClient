import axios from "axios"
import { address } from "../../utils/ServerConf"

export function updateRequestState(personId: string, state: boolean, permitId: string) {
    axios.post(
        address + "permits/state",
        {
            personId,
            state: state ? 'APPROVED' : 'DECLINED',
            permitId
        }
    ).then(value => {
        console.log(value)
    });
}