import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = require('./.scrt')

export default class App extends React.Component {
  constructor() {
    super()
    this._handlePressAsync = this._handlePressAsync.bind(this)
    this.state = {
      result: null,
    };
    console.log('anything')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Spotify" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl, 'redirectURL')
    let result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize` +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,

    });
    this.setState({ result });
  };
  componentDidMount() {
    this._handlePressAsync()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});