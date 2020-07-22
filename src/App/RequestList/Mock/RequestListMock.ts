import {RequestRow, RequestStatus} from "../RequestInterface/RequestInterface"

const mock: RequestRow[] = [
    {
        firstName: 'Osher',
        lastName: 'Baslo',
        id: '1',
        startAccess: new Date(),
        endAccess: new Date(),
        personId: '205587504',
        state: RequestStatus.APPROVED,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            timestamp: new Date(),
            info: "nice",
            reason: "Worker"
        }
    },
    {
        firstName: 'Itamar',
        lastName: 'Gold',
        id: '2',
        startAccess: new Date(),
        endAccess: new Date(),
        personId: '232523521',
        state: RequestStatus.DECLINED,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            timestamp: new Date(),
            info: "nice",
            reason: "Worker"
        }
    },
    {
        firstName: 'Lee',
        lastName: 'Cata',
        id: '3',
        startAccess: new Date(),
        endAccess: new Date(),
        personId: '213423151',
        state: RequestStatus.OPEN,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            timestamp: new Date(),
            info: "nice",
            reason: "Worker"
        }
    },
];

export default mock;