import axion from "axios"
import {address} from "../../utils/ServerConf";

export function fetchPersons(callback: (arg: any) => void) {
   axion.get(address + "persons")
       .then(data => {
           callback(data.data);
       }
   )
}