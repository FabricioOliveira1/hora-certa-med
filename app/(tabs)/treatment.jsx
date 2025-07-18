import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import NewRegisterButton from "../components/CardContainer/NewRegisterButton";
import TreatmentCard from "../components/CardContainer/TreatmentCard";
import Header from "../components/Header";
import useTreatamentContext from "../components/context/useTreatmentContext";

export default function Tratamentos() {

  const { treatment } = useTreatamentContext()
  
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        Remédios
      </Header>
      {treatment.length === 0 ?
        <View style={styles.cardContainer}>
          <View style={styles.nullContainer}>
            <Text style={styles.null}>Lista Vazia</Text>
          </View>
          <NewRegisterButton screen={'treatment'}>
            Adicionar novo tratamento
          </NewRegisterButton>
        </View>
        :
        <View style={styles.cardContainer}>
          <FlatList
            bounces={false}
            style={styles.listContainer}
            data={treatment}
            renderItem={({ item }) => <TreatmentCard tratamento={item} />}
            keyExtractor={tratamento => tratamento.treatmentId}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListFooterComponent={<View style={{ height: 65 }} />}
          />
          <NewRegisterButton screen='treatment'>
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
    height: '100%',
    justifyContent: 'space-between'
  },
  cardContainer: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 8
  },
  null: {
    fontSize: 24,
    textAlign: 'center',
    color: '#6a6969'
  },
  nullContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  listContainer: {
    backgroundColor: '#ccc',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 8,
    flex: 1,
  }
})