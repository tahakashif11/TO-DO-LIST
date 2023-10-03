import { StyleSheet} from 'react-native'

const homestyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 8,
    },
    editInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 8,
      flex: 1,
    },
    filterContainer: {
      paddingTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    filterButton: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    filterButtonText: {
      fontSize: 16,
    },
    activeFilter: {
      backgroundColor: '#3498db',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 16,
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    taskText: {
      flex: 1,
      fontSize: 16,
    },
    completedTask: {
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: 'gray',
      flex: 1,
    },
    editContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  
  export default homestyles