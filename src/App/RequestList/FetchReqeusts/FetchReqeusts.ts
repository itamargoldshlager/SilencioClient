import axios from "axios"
import {address} from "../../utils/ServerConf"

export function fetchMyRequests(myId: string, callback: (arg: any) => void): void {
    axios.get(
        address + "permits/" + myId
    ).then(
        value => {
            value.data.forEach((request:any) => {
                fetchPersonInfo(request.personId)
                    .then((personInfo: any) => {
                        const userAndPermit = {
                            id: request.id,
                            firstName: personInfo.data.firstName,
                            lastName: personInfo.data.lastName,
                            personId: request.personId,
                            startAccess: new Date(request.startAccess),
                            endAccess: new Date(request.endAccess),
                            state: request.state,
                            timestamp: new Date(request.timestamp),
                            company: personInfo.data.companyId,
                        };

                        callback(userAndPermit)
                    }
                )
            }
        )
    })
}

export function fetchManagerRequests(callback: (arg: any) => void): void {
    axios.get(
        address + "permits/"
    ).then(
        value => {
            value.data.forEach((request:any) => {
                fetchPersonInfo(request.personId)
                    .then((personInfo: any) => {
                        const userAndPermit = {
                            id: request.id,
                            firstName: personInfo.data.firstName,
                            lastName: personInfo.data.lastName,
                            personId: request.personId,
                            startAccess: new Date(request.startAccess),
                            endAccess: new Date(request.endAccess),
                            state: request.state,
                            timestamp: new Date(request.timestamp),
                            company: personInfo.data.companyId,
                            additionalInformation: {
                                requestBy: request.issuerId,
                                info: request.info,
                                reason: request.reason,
                                phone: personInfo.data.phone,
                                img: `https://silencio-faces.s3.eu-central-1.amazonaws.com/${request.personId}.jpg`,
                            }
                        };

                        callback(userAndPermit)
                    })
                }
            )
        }
    )
}

async function fetchPersonInfo(personId: string): Promise<any> {
    return axios.get(
        address + 'persons/' + personId
    ).then(value => value)
}
