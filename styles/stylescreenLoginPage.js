import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    textShadowColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default loginStyles;
