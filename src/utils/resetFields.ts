export const resetFields = (obj: any) => {
  for (let prop in obj) {
    if (typeof obj[prop] === 'string') {
      obj[prop] = '';
    }
  }
}

export default resetFields;