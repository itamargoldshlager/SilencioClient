import axios from 'axios';
import {address} from "../../utils/ServerConf"
export interface RequestPersonInfo {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    ID: string,
    img: File
}

export const SendRequestInfo = (requestInfo: {
    personId: string,
    issuerId: string,
    startAccess: number,
    endAccess: number,
    reason: string,
    info: string,
}, callback: () => void): void =>{
    axios.post(
        address + "/permits",
        requestInfo,
    ).then(_ => {
        callback();
    });
};

export const SendPersonInfo = (person: RequestPersonInfo, callback: () => void): void => {
    const formData = new FormData();

    formData.append('file', person.img);
    formData.append('firstName', person.firstName);
    formData.append('lastName', person.lastName);
    formData.append('phone', person.mobileNumber);
    formData.append('personId', person.ID);
    formData.append('companyId', '23');

    fetch(address  + "persons", {
        method: 'post',
        body: formData
    }).then(res => {
        console.log(res);
        callback();
    });
};
