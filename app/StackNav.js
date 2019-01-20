import React, { Component } from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Login, Graphics, Splash } from './components'

console.log(this.props, 'props at stacknav')

const LoginStack = createStackNavigator({
  Login: Login,
  graphics: Graphics,
  splash: Splash
}
)

const GraphicsStack = createStackNavigator({
  graphics: Graphics,
  Login: Login,
  splash: Splash
}
)

const SplashStack = createStackNavigator({
  splash: Splash,
  graphics: Graphics,
  Login: Login
})

console.log('logged the staskNav', Login)



export default createAppContainer(createBottomTabNavigator(
  {
    splash: SplashStack,
    Login: LoginStack,
    graphics: GraphicsStack
  }
)
)
