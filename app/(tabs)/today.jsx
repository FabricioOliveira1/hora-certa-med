import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Card from "../components/CardContainer/Card";
import NewRegisterButton from "../components/CardContainer/NewRegisterButton";
import Header from "../components/Header";
import useTreatamentContext from "../components/context/useTreatmentContext";


export default function Today() {

  const { list } = useTreatamentContext()

  return (
    <SafeAreaView style={styles.container}>
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
        
          <FlatList
            bounces={false}
            style={styles.listContainer}
            data={list}
            renderItem={({ item }) => <Card key={item.id} item={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009183',
    height: '100%',
    justifyContent: 'space-between'
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
    backgroundColor: '#CCCCCC',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
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