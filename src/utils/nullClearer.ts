const nullClearer = (arr: any[]): any[] => {
    let index: number = arr.indexOf(null, 0);

    while (index !== -1) {
        index = arr.indexOf(null, 0);
        console.log(index);
        arr.splice(index, 1);
    }

    return arr;
};

export default nullClearer;
