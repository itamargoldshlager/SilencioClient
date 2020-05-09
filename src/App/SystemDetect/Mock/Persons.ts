import {PersonProps} from "../PersonBox"
import Osher from "./Osher.png"
import unKnown from "./unKnown.png"
const Detects: PersonProps[] = [
    {
        approve: true,
        company: "Silencio",
        name: "Osher Baslo",
        img: Osher,
        detectDate: new Date()
    },
    {
        approve: false,
        detectDate: new Date(),
        img:unKnown,
    },
    {
        approve: false,
        img: Osher,
        detectDate: new Date()
    },
    {
        approve: true,
        company: "Silencio",
        name: "Osher Baslo",
        img:unKnown,
        detectDate: new Date()
    },
];

export default Detects;