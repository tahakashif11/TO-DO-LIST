import { StyleSheet } from 'react-native'



const signupstyle = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#ffffff',
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      backgroundColor: '#3498db',
      paddingVertical: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      color: '#fff',
    },
    form: {
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 15,
      backgroundColor: '#f2f2f2',
    },
    button: {
      backgroundColor: '#3498db',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
    },
    imageButton: {
      backgroundColor: '#3498db',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      alignSelf: 'center',
      marginVertical: 20,
    },
  });
  export default signupstyle