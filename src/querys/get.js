import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInfoWeather } from '../api/axios';

const citiesKey = "@cities"

export async function getAllCities() {
  const response = await AsyncStorage.getItem(citiesKey)
  return response != null ? JSON.parse(response) : null
}

export async function getAllDataFromCities() {
  const cities = await getAllCities()
  
  const data = []

  if (cities !== null) {
    for(const city of cities) {
      data.push(await getInfoWeather(city))
    }
  }

  return data
}