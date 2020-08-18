export enum RequestStatus {
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    OPEN = 'OPEN',
}

export interface ManagerInformation {
    requestBy: string,
    info: string,
    reason: string
    phone: string
    img: string,
}

export interface RequestRow {
    id: string,
    timestamp: Date,
    firstName: string,
    lastName: string,
    personId: string,
    startAccess: Date,
    endAccess: Date,
    state: RequestStatus
    company: string,
    additionalInformation?: ManagerInformation,
    onClick?: () => void
}