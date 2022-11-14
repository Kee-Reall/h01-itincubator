export type fields = "id"|"title"|"author"|"canBeDownloaded"|"minAgeRestriction"|
    "createdAt"|"publicationDate"|"availableResolutions"|""

export class ErrorMessage {
    constructor(
        public message: string = "unknown error",
        public field: fields = ""
    ) {}
}
