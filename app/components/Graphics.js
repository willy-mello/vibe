import React, { Component } from 'react'
import { View, Text, Button, TextInput, Alert, AsyncStorage } from 'react-native'
import styles from './styles'
import { AuthSession } from 'expo'
import { decode as atob, encode as btoa } from 'base-64'


class Graphics extends Component {
  constructor() {
    super()

    this.state = {
      user: null
    }
  }

  render() {
    return (
      <View>
        <Text>CLICK THE BUTTON MUTHAFFFFF</Text>
        <Button title="Get my songs plz, thx" onPress={() => this.getTop100()} />
      </View>
    )
  }
  getTop100 = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      console.log('tokencheckagain', token)
      const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }

      })
      console.log(response, 'response in graphics')
      const data = await response.json()
      console.log(data, 'topTracks from Graphics')
    } catch (error) {
      console.error(error)
    }

  }
}

export default Graphics
