export enum RequestStatus {
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    OPEN = 'OPEN',
}

export interface ManagerInformation {
    requestBy: string,
    company: string,
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
    additionalInformation?: ManagerInformation,
    onClick?: () => void
}