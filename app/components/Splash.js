import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Splash extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false
    }
  }


  render() {
    return (
      <View>
        {this.state.isLoggedIn ?
          <Text>ternary returned tru on splash</Text>
          :
          <Text>detecting who you are...</Text>
        }
      </View>

    )

  }
  componentDidMount() {
    console.log(this.props, 'this.props at splash.js')
    this.props.navigation.navigate('graphics')
  }


}

export default Splash