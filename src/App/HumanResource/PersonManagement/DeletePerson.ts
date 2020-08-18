import axios from "axios"
import {address} from "../../utils/ServerConf";

export function DeletePerson(personId: string, callback: () => void) {
    axios.delete(`${address}persons/${personId}`)
        .then(value =>
            callback()
    )

}