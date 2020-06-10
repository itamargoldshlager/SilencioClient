export enum RequestStatus {
    Confirmed = 'Confirmed',
    Rejected = 'Rejected',
    Pending = 'Pending',
}

export interface ManagerInformation {
    requestTime: Date,
    requestBy: string,
    company: string,
}

export interface RequestRow {
    requestId: string,
    firstName: string,
    lastName: string,
    id: string,
    startDate: Date,
    endDate: Date,
    status: RequestStatus
    additionalInformation?: ManagerInformation,
    onClick?: () => void
}