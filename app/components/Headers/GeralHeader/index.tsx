import { COLORS, SPACING } from "@/app/themes/treatmentThemes";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GeralHeaderProps {
  iconName?: string;
  title: string;
}

export default function GeralHeader ({iconName, title}: GeralHeaderProps): React.ReactElement {

  const router = useRouter();
   
  return (
          <View style={styles.header}>
        <View>
          <Text style={styles.brand}>Hora Certa Med</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
       {iconName && (
          <TouchableOpacity onPress={() => router.replace('/addTreatment')} style={styles.headerButton}>
            <FontAwesome name="plus" size={24} color={'#009183'} />
          </TouchableOpacity>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
})