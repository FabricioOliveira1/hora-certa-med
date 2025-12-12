import React from 'react'
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "../../components/CardContainer/Card"; 
import NewRegisterButton from "../../components/CardContainer/NewRegisterButton"; 
import Header from "../../components/Header"; 
import useTreatamentContext from "../../context/useTreatmentContext"; 

export default function Today(): React.ReactElement {

  const { list } = useTreatamentContext()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header>
        Hoje
      </Header>
      {list.length === 0 ?
        <View style={{ flex: 1 }}>
          <View style={styles.cardContainer}>
            <View style={styles.nullContainer}>
              <Text style={styles.null}>Lista Vazia</Text>
            </View>
            <NewRegisterButton screen='today'>
              Adicionar novo tratamento
            </NewRegisterButton>
          </View>
        </View>
        :
        <View style={{flex: 1}}>
          <FlatList
            bounces={false}
            style={styles.listContainer}
            data={list}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={item => String(item.id)}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={<View style={{ height: 80 }} />}
          />
          <NewRegisterButton screen='today'>
              Adicionar novo tratamento
            </NewRegisterButton>
        </View>

      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009183',
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#CCCCCC',
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBlock: 10,
    paddingHorizontal: 10,
    gap: 8
  },
  listContainer: {
    backgroundColor: '#ccc',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    gap: 8,
    flex: 1,
  },
  null: {
    fontSize: 24,
    textAlign: 'center',
    color: '#6a6969'
  },
  nullContainer: {
    height: '100%',
    justifyContent: 'center'
  }

})
