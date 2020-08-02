import axios from "axios"
import {address} from "../../utils/ServerConf";

export function fetchInitialState(callback: (events: any) => void):void {
    axios.get(address + "gate/events").then(value => {
        console.log(value.data)
        callback(value.data)
    });
}