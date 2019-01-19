import React from 'react';
import { Button, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import { decode as atob, encode as btoa } from 'base-64'

import { createStackNavigator, createAppContainer } from 'react-navigation'
import AppContainer from './app/StackNav'


const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, scopes } = require('./.scrt')

class App extends React.Component {
  constructor() {
    super()



  }


  render() {
    return (
      <View style={styles.container}>
        <AppContainer />


        {/* <Button title="Login with Spotify" onPress={() => this._handleAuthSession()} />
      
        
        <Button title="Destroy Credentials" onPress={() => this.logout()} /> */}
      </View>
    );
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
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem(
        'expirationTime',
        JSON.stringify(expirationTime)
      );

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
  componentDidMount() {
    console.log('mounted')

  }
}
// const StackNav = createStackNavigator({
//   home: Home

// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AppContainer
