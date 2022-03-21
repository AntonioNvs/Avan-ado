import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { getInfoWeather } from './src/api/axios';

import Card from './src/components/card';
import SearchBar from './src/components/searchBar';
import { addCity } from './src/querys/create';
import { getAllDataFromCities } from './src/querys/get';
import { deleteCity } from './src/querys/delete';

export default function App() {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    getAllDataFromCities().then(data => setDataList(data))
  }, [])

  async function handleQuery(textQuery) {
    const response = await getInfoWeather(textQuery) 

    if (response !== null) {
      setDataList([...dataList, response])
      await addCity(response.city)
    }
  }

  async function handleDeleteCity(city) {
    Alert.alert(
      "Deseja mesmo excluir?",
      "",
      [
        {
          text: "Sim",
          onPress: () => {
            deleteCity(city).then()
            const filteredDataList = dataList.filter(data => data.city !== city)
            setDataList(filteredDataList)
          }
        },
        {
          text: "Não",
          onPress: () => {}
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SearchBar executeWhenPressEnter={handleQuery}/>
      <ScrollView style={styles.scroll}>
        {
          dataList && dataList.map((data, idx) => {
            return (
              <Card key={idx} data={data} onDelete={handleDeleteCity}/>
            )
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  scroll: {
    flex: 1
  }
});
