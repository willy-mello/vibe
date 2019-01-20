import React, { Component } from 'react'
import { View, Text, Button, TextInput, Alert, AsyncStorage } from 'react-native'
import styles from './styles'
import { AuthSession } from 'expo'
import { decode as atob, encode as btoa } from 'base-64'
// import { genreFinder } from '../utils.js'


class Graphics extends Component {
  constructor() {
    super()

    this.state = {
      tracks: {}
    }
  }

  render() {
    return (
      (Object.values(this.state.tracks).length === 0 ?

        <View>
          <Text>GET MY TOP TRACKS MOTHAFFFFF</Text>
          <Button title="Get my songs plz, thx" onPress={() => this.getTop100()} />
        </View>
        :
        <View>
          <Text>I got the songs mothafffffff</Text>
          <Button title="Do the genre match plz" onPress={() => this.genreFinder(this.state.tracks)} />


        </View>

      )
    )
  }
  getTop100 = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      console.log('tokencheckagain', token)
      const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }

      })
      // console.log(response, 'response in graphics')
      const data = await response.json()
      console.log(data, 'topTracksObject from Graphics')
      console.log('data is an array?', Array.isArray(data))
      this.setState({
        tracks: data
      })
    } catch (error) {
      console.error(error)
    }

  }
  genreFinder = (obj) => {
    let allTracks = obj

    let justGenres = allTracks.items.map((elem) => {
      return elem.genres
    })
    // console.log(justGenres, 'just genres')
    let reducer = (acc, currVal) => acc = acc.concat(currVal)
    let flattened = justGenres.reduce(reducer, [])
    let simpleTaste = flattened.map((elem) => {
      let splitElem = elem.split(' ')
      return splitElem[splitElem.length - 1]
    })
    // console.log(simpleTaste)
    let distinctGenres = [...new Set(simpleTaste)]
    // console.log(simpleTaste)
    const dic = {}
    for (let i = 0; i < distinctGenres.length; i++) {
      let n = 0
      for (let j = 0; j < simpleTaste.length; j++) {
        if (simpleTaste[j] === distinctGenres[i]) { n++ }
      }
      dic[distinctGenres[i]] = n
    }
    console.log(dic, 'dic')
  }
}

export default Graphics
