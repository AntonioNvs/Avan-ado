import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCities } from './get';

const citiesKey = "@cities"

export async function deleteCity(city) {
  const allCities = await getAllCities()

  const filteredCities = allCities.filter(c => c !== city)

  const data = JSON.stringify(filteredCities)
  await AsyncStorage.setItem(citiesKey, data)
}