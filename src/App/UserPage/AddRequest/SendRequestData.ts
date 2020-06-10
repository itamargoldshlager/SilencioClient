import axios from 'axios';
import {address} from "../../utils/ServerConf"
export interface RequestPersonInfo {
    firstName: string,
    lastName: string,
    mobileNumber: string,
    ID: string,
    img: File
}

const readFileDataAsBase64 = (image: File) => {
    const file = image;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            // @ts-ignore
            resolve(event.target.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsArrayBuffer(file);
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
        if(res.ok) {
            alert("File uploaded successfully.")
        }
    });

    // const data = new FormData();
    // data.append('personId', person.ID);
    // data.append('firstName', person.firstName);
    // data.append('lastName', person.lastName);
    // data.append('phone', person.ID);

    // readFileDataAsBase64(person.img)
    //     .then(value => {
    //         const data = new FormData();
    //         data.append('personId', person.ID);
    //         data.append('firstName', person.firstName);
    //         data.append('lastName', person.lastName);
    //         data.append('phone', person.ID);
    //         data.append('img', person.img);
    //         // const data = {
    //         //     personId:person.ID,
    //         //     firstName: person.firstName,
    //         //     lastName: person.lastName,
    //         //     phone: person.ID,
    //         //     images: [{payload:value, timestamp: new Date().getDate()}],
    //         //     companyId: '1'
    //         // };
    //         const headers = {
    //             'Content-Type': 'application/json'
    //         };
    //         axios.post(address  + "persons", data, {
    //             headers: headers
    //         }).then(
    //             res => console.log(res)
    //         );
    //     });

    // const headers = { 'Content-Type': 'multipart/form-data' };
    // axios.post(address  + "persons", data, {
    //     headers: headers
    // }).then(
    //     res => console.log(res)
    // );
};
