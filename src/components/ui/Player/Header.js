import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const PlayerHeader = ({desc}) => {
    const navigation = useNavigation()
  return (
    <View className="w-80 mt-5" >
    <View className=" absolute -left-5 top-2">
    <TouchableOpacity onPress={()=> navigation.goBack()}>
    <AntDesign name="left" style={{fontSize: 20, color:'white', marginRight:10}} />
    </TouchableOpacity>
    </View>
    <Text className="text-center text-white text-2xl ">Introduction to meditation</Text>
    <Text className="text-center text-white">by Joys Florez</Text>
    <Text className="text-center text-white mt-8 ">{desc}</Text>
    </View>
  )
}

export default PlayerHeader