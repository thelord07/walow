import React from 'react'
import Layout from '../../components/Layout';
import {Button, Image, View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
/* const logo = require('../src/assets/img/logo.png'); */


const HomeScreen = () => {
    const navigation = useNavigation()
  return (
    <Layout>
        {/* <Image source={logo} style={{width: 200, height: 200}} /> */}
        <View className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300">
          <Button title=" Go to Player" onPress={() => navigation.navigate('Player')} />
        </View>
      </Layout>
  )
}

export default HomeScreen