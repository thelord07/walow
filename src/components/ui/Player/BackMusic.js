import {TouchableOpacity, Text, FlatList, ImageBackground} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SoundPlayer from 'react-native-sound-player';
import { useEffect } from 'react';


const Item = ({item, onPress}) => (
  <>
    <TouchableOpacity onPress={onPress} className="w-24 h-24 ml-5 mr-5">
      <ImageBackground
        source={{uri: item.cover}}
        resizeMode="cover"
        className="w-24 h-24 justify-center items-center">
        <Text className="text-white text-xl">{item.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
    <Text></Text>
  </>
);

const BackMusic = ({music, selectSong, song, sound, setSound}) => {
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => selectSong(item)} />;
  };

  useEffect(() => {
    playPriMusic()
  }, [song])
  

  const playPriMusic =  () => {
  try {
    SoundPlayer.playUrl(song.sound);
  } catch (error) {
    console.log(`cannot play the sound file`, e);
  }
};


  return (
    <>
      {!sound ? (
        <>
        <TouchableOpacity
          onPress={() => setSound(true)}
          style={{backgroundColor: '#ffffff40'}}
          className="relative rounded-xl border-solid border-white border-2 p-3 justify-center items-center">
          <AntDesign name="sound" style={{fontSize: 50, color: 'white'}} />
          <Text className="absolute text-7xl text-white rotate-45 ">/</Text>
        </TouchableOpacity>
        <Text className="text-white mt-5 text-xl font-we w-36 text-center font-bold" >Background Sounds</Text>
        </>
      ) : (
        <FlatList
          horizontal
          data={music}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
};

export default BackMusic;
