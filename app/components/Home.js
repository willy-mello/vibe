import React, { Component } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import styles from './styles'


class Home extends Component {

  state = { username: "", password: '' }

  checkLogin() {
    const { username, password } = this.state
    console.warn(username, password)
    if (username === 'admin' && password === 'admin') {
      this.props.navigation.navigate('dashboard')
    }
  }
  render() {
    const { heading, input, parent } = styles
    return (
      <View style={parent}>
        <Text style={heading}>Login Here</Text>
        <TextInput style={input} placeholder='Username' />
        <TextInput style={input} secureTextEntry={true} placeholder='PASSWORD MUTHAFUCKASDDAAS' />
        <Button title={"login"} onPress={_ => this.checkLogin()} />
      </View>
    )
  }
}

export default Home
