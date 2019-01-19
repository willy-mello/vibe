import React from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import styles from './styles'


class Home extends React.Component {




  render() {
    const { heading, input, parent } = styles
    return (
      <View style={parent}>
        <Text style={heading}>Login Here</Text>

      </View>
    )
  }
}

export default Home
