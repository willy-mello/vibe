import React from 'react'
import { View, Text, TextInput, Button, Alert, AsyncStorage } from 'react-native'
import styles from './styles'
import { AuthSession } from 'expo';
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, scopes } = require('../../.scrt.js')
import { decode as atob, encode as btoa } from 'base-64'

class Login extends React.Component {




  render() {
    const { heading, input, parent } = styles
    return (
      <View style={parent}>
        <Text style={heading}>Give Us Your Data???</Text>
        <Button title="Login with Spotify" onPress={() => this._handleAuthSession()} />

      </View>
    )
  }
  _handleAuthSession = async () => {
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          CLIENT_ID +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      });

      console.log('results', result)

      const spotifyAuthCode = result.params.code;
      const credsB64 = btoa(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      );
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${spotifyAuthCode}&redirect_uri=${
          CALLBACK_URL
          }`,

      });
      const responseJson = await response.json();
      console.log('\n\n\n\n', responseJson)
      const {
        access_token,
        refresh_token,
        expires_in,
      } = responseJson;
      // const expirationTime = new Date().getTime() + expiresIn * 1000;
      await AsyncStorage.setItem('accessToken', access_token);
      const token_check = await AsyncStorage.getItem('accessToken')
      console.log('Just stoed the token', token_check)
      await AsyncStorage.setItem('refreshToken', refresh_token);
      await AsyncStorage.setItem(
        'expirationTime',
        JSON.stringify(expires_in)
      );
      // this.props.navigation.navigate('graphics')

    } catch (error) {
      console.error(error);
    }
  };;

  logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('refreshToken')
      await AsyncStorage.removeItem('expirationTime')
      console.log('credentials destroyed')
    } catch (error) {
      console.error(error)
    }
  }
}

export default Login
