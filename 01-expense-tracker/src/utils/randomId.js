const randomId = () => {
    const str = '0123456789abcdefABCDEF';
    let id = '';

    for (let i = 1; i <= 16; i++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    return id;
};

export default randomId;