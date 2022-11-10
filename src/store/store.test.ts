import { Store } from "./store";
const testStore = new Store([]);

test("test for inital state", ()=> {
    expect(testStore.state).toEqual([]);
})

// test("test to pull", () => {
//     expect(testStore.push())
// })