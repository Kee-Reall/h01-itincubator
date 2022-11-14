type fields = "id"|"title"|"author"|"canBeDownloaded"|"minAgeRestriction"|
    "createdAt"|"publicationDate"|"availableResolutions"|""

export class ErrorMessage {
    constructor(
        public message: string = "unknown error",
        public field: fields = ""
    ) {}
}

export class ApiError {
    public errorsMessages: ErrorMessage[] = []
    constructor(private Array: ErrorMessage[]) {
        this.errorsMessages = [...Array]
    } 
}