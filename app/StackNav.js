import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Home, Graphics, Dashboard } from './components'

console.log(this.props, 'props at stacknav')

const HomeStack = createStackNavigator({
  home: Home,
  graphics: Graphics
}
)

const GraphicsStack = createStackNavigator({
  graphics: Graphics,
  home: Home
}
)

console.log('logged the staskNav', Home)



export default createAppContainer(createBottomTabNavigator(
  {
    home: HomeStack,
    graphics: Graphics
  }
)
)
