export interface errorMessage {
    message: string
    field: string
}

export interface APIErrorResult {
    errorsMessages: Array<errorMessage>
}