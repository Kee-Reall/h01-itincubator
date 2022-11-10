import { Store } from "./store";
import {before} from "node:test";
const testStore = new Store([
    {
        "id": 99,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-10T16:10:55.563Z",
        "publicationDate": "2022-11-10T16:10:55.563Z",
        "availableResolutions": [
            "P144"
        ]
    }
]);

test("test for inital state", ()=> {
    expect(testStore.state).toEqual([{
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-10T16:10:55.563Z",
        "publicationDate": "2022-11-10T16:10:55.563Z",
        "availableResolutions": [
            "P144"
        ]
    }]);
})

// test("test to pull", () => {
//     expect(testStore.push())
// })