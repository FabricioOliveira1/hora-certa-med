import { StyleSheet, View } from "react-native";
import useTreatamentContext from "../context/useTreatmentContext";
import Card from "./Cards";
import NewRegisterButton from "./NewRegisterButton";
import TretmentCard from "./TretmentCard";

export default function CardContainer({ screen }) {

  const { treatment } = useTreatamentContext()

  return (
    <View style={styles[`${screen}`]}>

      {screen === 'treatment' ?
        treatment.map((tratamento) =>
          <TretmentCard key={tratamento.id} tratamento={tratamento}/>) :
        treatment.map((tratamento) =>
          <Card key={tratamento.id} tratamento={tratamento} />) 
      }
      <NewRegisterButton screen={screen}>
        Adicionar novo tratamento
      </NewRegisterButton>
    </View>
  )
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
  }
})