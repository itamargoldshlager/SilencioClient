import axios from 'axios'
import {address} from "../utils/ServerConf";
import {userDetails} from "./UserDetails";
import {PersonProps} from "../HumanResource/PersonManagement/PersonTable/PersonTableRow";

export function FetchUserDetails(userId: string, callback: (result: any) => void) {
    axios.get(`${address}persons/${userId}`)
        .then(value => {
            callback(resolveRequest(value.data))
        }
    )
}

function resolveRequest(data: PersonProps): userDetails {
    return {
        company: data.companyId,
        beginEntrancePermit: new Date(data.permits[0].startAccess),
        endEntrancePermit: new Date(data.permits[0].endAccess),
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phone,
        img: `https://silencio-faces.s3.eu-central-1.amazonaws.com/${data.personId}.jpg`,
        acceptedBy: data.permits[0].accepterId || '',
    }
}