import { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const afternoonStyle = {
  firstBackgroundColor: "#d17e0a",
  secondBackgroundColor: "#e0aa07"
}

const nightStyle = {
  firstBackgroundColor: "#15171c",
  secondBackgroundColor: "#282a2e"
}

const dawnStyle = {
  firstBackgroundColor: "#2a2e2b",
  secondBackgroundColor: "#314882"
}

const dayStyle = {
  firstBackgroundColor: "#4e79ad",
  secondBackgroundColor: "#63addb"
}


export default function Card({ data, onDelete }) {
  const [timeText, setTimeText] = useState("Day")
  const [icon, setIcon] = useState("sun")
  const [weatherStyle, setWeatherStyle] = useState(dayStyle)

  useEffect(() => {
    const hours = parseInt(data.localTime.split(" ")[1].split(":")[0])
    if (hours >= 3 && hours <= 6) {
      setWeatherStyle(dawnStyle)
      setTimeText("Dawn")
    } else if (hours >= 19 || hours < 3) {
      setWeatherStyle(nightStyle)
      setTimeText("Night")
    } else if (hours >= 16 && hours < 19) {
      setWeatherStyle(afternoonStyle)
      setTimeText("Afternoon")
    }
    
    if (data.cloudcover >= 60) {
      setIcon("cloud")
    }

    if (data.precip >= 30) {
      setIcon("cloud-rain")
    }
  }, [])

  return (
    <LinearGradient 
      style={styles.cardContainer}
      colors={[weatherStyle.firstBackgroundColor, weatherStyle.secondBackgroundColor]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.headerCardText}>{timeText}</Text>
        <TouchableOpacity onPress={() => onDelete(data.city)}>
          <Feather name="trash-2" color="#d9d9d9" size={24}/>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Feather name={icon} color="#FAFAFA" size={72} />
        <Text style={styles.temperatureText}>{data.temperature} °C</Text>
        <Text style={styles.cityText}>{data.city}</Text>

        <View style={styles.downCardContent}>
          <View style={styles.infoDownContainer}>
            <Text style={styles.titleInfoDown}>Wind now</Text>
            <Text style={styles.contentInfoDown}>
              {data.windSpeed}
              <Text style={styles.measureContentInfoDown}>km</Text>
            </Text>
          </View>

          <View style={styles.infoDownContainer}>
            <Text style={styles.titleInfoDown}>Humidity</Text>
            <Text style={styles.contentInfoDown}>
              {data.humidity}
              <Text style={styles.measureContentInfoDown}>%</Text>
            </Text>
          </View>

          <View style={styles.infoDownContainer}>
            <Text style={styles.titleInfoDown}>Precipit..</Text>
            <Text style={styles.contentInfoDown}>
              {data.precip}
              <Text style={styles.measureContentInfoDown}>%</Text>
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#63addb",
    borderRadius: 20,
    marginTop: 24,
    padding: 12,
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerCardText: {
    fontSize: 14,
    color: "#d9d9d9"
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 12
  },
  temperatureText: {
    fontSize: 36,
    color: "#FAFAFA",
    fontWeight: "bold"
  },
  cityText: {
    fontSize: 20,
    color: "#FAFAFA"
  },
  downCardContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16
  },
  infoDownContainer: {
    alignItems: "center"
  },
  titleInfoDown: {
    color: "#dedede"
  },
  contentInfoDown: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAFAFA"
  },
  measureContentInfoDown: {
    fontSize: 12
  }
})