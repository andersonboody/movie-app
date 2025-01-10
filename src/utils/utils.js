const reductionStr = (str) => {
  let newStr = ''
  const arrStr = str.split(' ')
  if (arrStr.length <= 38) {
    return str
  } else {
    newStr = arrStr.slice(0, 38).join(' ')
  }
  return `${newStr} ... `
}

export { reductionStr }
