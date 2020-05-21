import {RequestRowProps} from "../RequestRow"
import RequestImage1 from "./1.jpg"
import RequestImage2 from "./2.jpg"
import RequestImage3 from "./3.jpg"
import RequestImage4 from "./4.jpg"
import RequestImage5 from "./5.jpg"
import RequestImage6 from "./6.jpg"

const mock: RequestRowProps[] = [
    {
        firstName: 'Julia',
        lastName: 'Robert',
        img: RequestImage1,
        requestId: '1',
        startDate: new Date(),
        endDate: new Date()
    },
    {
        firstName: 'Alina',
        lastName: 'Blob',
        img: RequestImage2,
        requestId: '2',
        startDate: new Date(),
        endDate: new Date()
    },
    {
        firstName: 'Arik',
        lastName: 'Goldshmit',
        img: RequestImage3,
        requestId: '3',
        startDate: new Date(),
        endDate: new Date()
    },
    {
        firstName: 'Jhon',
        lastName: 'Wick',
        img: RequestImage4,
        requestId: '4',
        startDate: new Date(),
        endDate: new Date()
    },
    {
        firstName: 'Yossi',
        lastName: 'Bismut',
        img: RequestImage5,
        requestId: '5',
        startDate: new Date(),
        endDate: new Date()
    },
    {
        firstName: 'Monni',
        lastName: 'Dov',
        img: RequestImage6,
        requestId: '6',
        startDate: new Date(),
        endDate: new Date()
    }

];

export default mock;