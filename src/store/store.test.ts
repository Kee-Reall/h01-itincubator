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

const pushThenFind = {
    title:'afa',
    author:'mee',
    availableResolutions: null
}

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
    expect(testStore.push(pushThenFind)).toEqual([true,0])
})

test("find unexist",()=> {
    expect(testStore.find(NaN)).toEqual(undefined)
})

test("test for find one",()=>{
    expect(testStore.find(0)).toEqual({
        id: 0,
        ...pushThenFind,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: expect.any(String),
        publicationDate: expect.any(String),

    })
})

test('Push incorrect',()=>{
    expect(testStore.push({
        // @ts-ignore
        title:32,
        author:'',
        // @ts-ignore
        availableResolutions: [33]
    })).toEqual([{"field": ["title", "author", "availableResolutions"], "message": "There is some error inside. Check field to see witch field has error"}])

})