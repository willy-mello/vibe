import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Home, Graphics, Dashboard } from './app/components'

export const StackNav = createStackNavigator({
  home: Home,
  graphics: Graphics,
  dashboard: Dashboard
})