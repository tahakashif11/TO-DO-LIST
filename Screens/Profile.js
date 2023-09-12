import { StyleSheet, Text, View ,Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

const Profile = ({route}) => {
  const[userData,setUserData]=useState()
  
  const userId = route.params.userid;
  
  console.log(userId)
  useEffect(() => {
    // Make the API call
    const fetch=async ()=>{
    try {
      let res=await axios.get(`https://dummyjson.com/users/${userId}`)
      setUserData(res.data)
    } catch (error) {

      console.log(error)
    }
  }
  fetch()
  }, [userId]);
  
  return (
    <View style={styles.container}>
      {userData ? (
        <>
        
        <ImageBackground source={{
    uri: userData.image}} style={{flex:1,}} >
    <View style={{flexDirection:'row'}}>
          <Text style={styles.Textshow}>Name: </Text>
          <Text style={{fontSize:22,color:'black'}}> {userData.firstName}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.Textshow}>Email:  </Text>
          <Text style={{fontSize:22,color:'black'}}> {userData.email}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.Textshow}>Weight: </Text>
          <Text style={{fontSize:22,color:'black'}}>{userData.weight}</Text>
          </View>
           </ImageBackground>
           
        </>
       
      ) : (
        <Text>Loading user data...</Text>
      )}
      </View>
  );
      }
  
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'mintcream',
    paddingLeft:30

  },
  Textshow:{
    fontSize:20,
    color: 'blue',
    fontWeight: 'bold',
    
  }
});


export default Profile

