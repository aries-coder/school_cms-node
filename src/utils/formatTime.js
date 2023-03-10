const formatTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`

  return `${year}-${month}-${day}`
}
module.exports = {
  formatTimeStamp
}