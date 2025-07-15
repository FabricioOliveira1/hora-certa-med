import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useGetGlobalTodayList from "../hooks/useGetTodayGlobalList";
import Card from "./Card";
import NewRegisterButton from "./NewRegisterButton";
import TreatmentCard from "./TreatmentCard";

export default function CardContainer({ screen, treatment }) {

  const [list, setList] = useState([])

  const { getGlobalList } = useGetGlobalTodayList()

  useEffect(() => {
    setList(getGlobalList(treatment)) 
  }, [])

  console.log('screen: ', screen)
  

  if (list.length === 0) {
    return (
      <View style={styles[`${screen}`]}>
        <View style={styles.nullContainer}>
          <Text style={styles.null}>Lista Vazia</Text>
        </View>
        <NewRegisterButton screen={screen}>
          Adicionar novo tratamento
        </NewRegisterButton>
      </View>
    )
  } else {
    return (<View style={styles[`${screen}`]}>

        {screen === 'treatment' ?
          treatment.map((tratamento) =>
            <TreatmentCard key={tratamento.treatmentId} tratamento={tratamento} />) :
          list.map((item) => (
            <Card key={item.id} item={item} />)
          )
        }
        <NewRegisterButton screen={screen}>
          Adicionar novo tratamento
        </NewRegisterButton>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  today: {
    backgroundColor: '#CCCCCC',
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBlock: 10,
    paddingHorizontal: 10,
    gap: 8
  },
  treatment: {
    backgroundColor: '#CCCCCC',
    flex: 1,
    position: 'relative',
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
  }
})