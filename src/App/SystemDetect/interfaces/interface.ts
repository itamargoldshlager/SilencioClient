export interface detectionEvent {
    indication: string,
    personId: string,
    imageUrl: string,
    timestamp: number,
    cameraId: string
}

export const s3Bucket = "TODO";