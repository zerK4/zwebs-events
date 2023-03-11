export const isComplete = (obj: any) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop) && (obj[prop] === null || obj[prop] === undefined || obj[prop] === '')) {
          return false;
        }
    }
    return true;
}

export default isComplete;