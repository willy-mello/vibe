import React from 'react';
import { Button, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import { spotifyApi } from './app/spotifyAPI'

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, scopes } = require('./.scrt')

export default class App extends React.Component {
  constructor() {
    super()
    // this._handlePressAsync = this._handlePressAsync.bind(this)
    this.state = {
      result: null,
      expiration: null
    };


  }


  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Spotify" onPress={() => this._handleAuthSession()} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
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
      console.log(AsyncStorage.accessToken, 'look over here')
    } catch (error) {
      console.error(error);
    }
  };;
  componentDidMount() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});