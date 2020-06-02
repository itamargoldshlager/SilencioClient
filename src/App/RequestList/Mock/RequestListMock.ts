import {Request, RequestStatus} from "../RequestInterface/RequestInterface"

const mock: Request[] = [
    {
        firstName: 'Osher',
        lastName: 'Baslo',
        requestId: '1',
        startDate: new Date(),
        endDate: new Date(),
        id: '205587504',
        status: RequestStatus.Confirmed,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            requestTime: new Date()
        }
    },
    {
        firstName: 'Itamar',
        lastName: 'Gold',
        requestId: '2',
        startDate: new Date(),
        endDate: new Date(),
        id: '232523521',
        status: RequestStatus.Rejected,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            requestTime: new Date()
        }
    },
    {
        firstName: 'Lee',
        lastName: 'Cata',
        requestId: '3',
        startDate: new Date(),
        endDate: new Date(),
        id: '213423151',
        status: RequestStatus.Pending,
        additionalInformation: {
            company: 'Silencio',
            requestBy: 'Tal pahima',
            requestTime: new Date()
        }
    },
];

export default mock;