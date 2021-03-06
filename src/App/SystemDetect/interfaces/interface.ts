export interface detectionEvent {
    indication: string,
    personId: string,
    imageUrl: string,
    timestamp: number,
    cameraId: string
}

export const s3Bucket = "https://silencio-persons.s3.eu-central-1.amazonaws.com/";