// eslint-disable-next-line import/prefer-default-export
export function getActualTime() {
  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const time = new Date()
  let hour = time.getUTCHours()
  let minute = time.getUTCMinutes()
  const day = time.getUTCDate()
  const month = monthsList[time.getUTCMonth()]

  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute

  const data = `${hour}:${minute}, ${day} ${month}`
  return data
}
