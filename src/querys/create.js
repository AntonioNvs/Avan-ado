import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCities } from './get';

const citiesKey = "@cities"

export async function addCity(city) {
  let cities = await getAllCities()

  if (cities === null)
    cities = []

  cities.push(city)

  const data = JSON.stringify(cities)
  await AsyncStorage.setItem(citiesKey, data)
}