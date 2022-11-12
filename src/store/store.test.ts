import { Store } from "./store";
const testStore = new Store([
    {
        "id": 80,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-12T08:42:13.114Z",
        "publicationDate": "2022-11-12T08:42:13.114Z",
        "availableResolutions": [
            "P144"
        ]
    }
]);

test("test for initial state", ()=> {
    expect(testStore.state).toEqual([{
        "id": 80,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-12T08:42:13.114Z",
        "publicationDate": "2022-11-12T08:42:13.114Z",
        "availableResolutions": [
            "P144"
        ]
    }])
})

test("test after push",()=>{
    expect(testStore.push({
        title:'afa',
        author:'mee',
        availableResolutions: null
    })).toEqual([true,0])
})

// test("test to pull", () => {
//     expect(testStore.push())
// })