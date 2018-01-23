import { AsyncStorage } from 'react-native'

class localStorage {
  async setItem( objectName, object )
  {
    try
    {
      return await AsyncStorage.setItem('@localStorage:'+objectName, JSON.stringify( object ))
      
    }
    catch( error )
    {
      console.log( error )
      return false
    }    
  }

  async getItem( objectName )
  {
    try
    {
      return await AsyncStorage.getItem('@localStorage:'+objectName)
    }
    catch( error )
    {
      console.log( error )
      return false
    }    
  }
}

export const storage = new localStorage()