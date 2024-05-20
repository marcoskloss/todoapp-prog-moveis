import { useEffect, useState } from "react"
import { Slot } from "expo-router"
import * as Location from "expo-location"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native"
import SunriseSunsetService from "../services/sunrise-sunset"

const STATUS = {
  ASKING_FOR_LOCATION: "🛠️: verificando permissão de uso da localização",
  LOCATION_DENIED: "😔: não temos acesso a sua localização",
  GETTING_SUNRISE_SUNSET: "🤔: buscando informações do período do dia",
  ERROR_SUNSET_SUNRISE_API:
    "💀: deu ruim ao buscar as informações do período do dia",
  PERIOD_DAY: "🌞: é dia",
  PERIOD_NIGHT: "🌑: é noite",
}

new Promise((resolve) => {
  resolve()
})

export default function AppLayout() {
  const [status, setStatus] = useState(STATUS.ASKING_FOR_LOCATION)

  const setUserThemeBasedOnLocation = async () => {
    const location = await Location.requestForegroundPermissionsAsync()

    if (location.status !== "granted") {
      setStatus(STATUS.LOCATION_DENIED)
      return
    }

    try {
      setStatus(STATUS.GETTING_SUNRISE_SUNSET)

      const { coords } = await Location.getCurrentPositionAsync()
      const period = await SunriseSunsetService.verifyPeriodOfDay(
        coords.latitude,
        coords.longitude
      )

      setStatus(period === 'day' ? STATUS.PERIOD_DAY : STATUS.PERIOD_NIGHT)
    } catch (ex) {
      setStatus(STATUS.ERROR_SUNSET_SUNRISE_API)
      return
    }
  }

  useEffect(() => {
    setUserThemeBasedOnLocation()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
      <Text
        style={{
          position: "absolute",
          bottom: 8,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          backgroundColor: "#fffffff0",
        }}
      >
        {status}
      </Text>
    </SafeAreaView>
  )
}
