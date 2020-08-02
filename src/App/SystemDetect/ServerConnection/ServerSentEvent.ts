import {address} from "../../utils/ServerConf";

export function serverSendEventHandler(callback: (detection: any) => void) {
    const source = new EventSource(address + "gate/updates/");

    source.addEventListener("Detection", ((event:any) => {
        console.log(JSON.parse(event.data));
        callback(JSON.parse(event.data));
    }));
}

