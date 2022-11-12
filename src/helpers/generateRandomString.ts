function generateRandomString(len: number) {
    let result: string     = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < len; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

for(let i = 0; i<10; i++){
    console.log(generateRandomString(20) +'\n' + generateRandomString(40))
}