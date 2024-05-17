const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

async function verifyPeriodOfDay(lat, lng) {
  const { sunrise, sunset } = await getSunriseSunsetInfo(lat, lng)
  const now = new Date()
  
  const hour = now.getHours()
  const minute = now.getMinutes()

  // 'day' = now >= sunrise && now < sunset

  if (hour >= sunrise.hours && hour < sunset.hours) {
    return 'day'
  }

  if (hour === sunset.hours && minute < sunset.minutes) {
    return 'day'
  }
}

export async function getSunriseSunsetInfo(lat, lng) {
  console.log('buscando sunrise-sunset')

  // Ref: https://sunrise-sunset.org/api
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&tzid=${DEFAULT_TIMEZONE}`

  const response = await fetch(url)
  const data = await response.json()

  const { sunrise, sunset } = data.results
  
  return {
    sunrise: timeAmPmTo24Hour(sunrise), 
    sunset: timeAmPmTo24Hour(sunset),
  }
}

function timeAmPmTo24Hour(timeStr) {
  // Ex: "7:00:56 PM" -> "19:00:56" 
  const [time, suffix] = timeStr.split(' ')
  let [hours, minutes, seconds] = time.split(':').map(Number)

  if (suffix === 'PM') {
    hours += 12
  }

  return { hours, minutes, seconds }
}

export default { getSunriseSunsetInfo }