import { StyleSheet} from 'react-native'
const profilestyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'mintcream',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 20,
      borderRadius: 10,
    },
    nameText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    emailText: {
      fontSize: 18,
      color: 'black',
    },
    weightText: {
      fontSize: 18,
      color: 'black',
    },
  });

export default profilestyle