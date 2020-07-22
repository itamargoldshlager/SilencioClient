export enum RequestStatus {
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    OPEN = 'OPEN',
}

export interface ManagerInformation {
    timestamp: Date,
    requestBy: string,
    company: string,
    info: string,
    reason: string
}

export interface RequestRow {
    id: string,
    firstName: string,
    lastName: string,
    personId: string,
    startAccess: Date,
    endAccess: Date,
    state: RequestStatus
    additionalInformation?: ManagerInformation,
    onClick?: () => void
}