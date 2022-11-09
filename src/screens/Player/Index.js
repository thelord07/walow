import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import {ImageBackground, View, Text} from 'react-native';
import PlayerHeader from '../../components/ui/Player/Header';
import Player from '../../components/ui/Player/Player';
import BackMusic from '../../components/ui/Player/BackMusic';
import {back_sounds, music} from '../../data/data';

const PlayerScreen = () => {
  const [backgroundMusic, setBackgroundMusic] = useState([]);
  const [bkmusicSelected, setBkmusicSelected] = useState({});
  const [bcSound, setBcSound] = useState(false)
  const [songPlay, setSongPlay] = useState({});
  useEffect(() => {
    setBackgroundMusic(back_sounds);
    setBkmusicSelected(back_sounds[0])
    setSongPlay(music[0]);
  }, [music, back_sounds]);

  const handleSelectSong = song => {
    setBkmusicSelected(song);
  };
console.log({bcSound})
  return (
    <Layout>
      <ImageBackground
        source={{uri: songPlay.background}}
        className="flex-1 w-screen justify-evenly items-center relative z-0">
        <View className="absolute w-screen h-screen bg-black opacity-20"/>
        <PlayerHeader desc={songPlay?.description} />
        <Player song={songPlay} />
        <View className="w-screen justify-center items-center -mt-10" >
          <BackMusic
            music={backgroundMusic}
            selectSong={handleSelectSong}
            song={bkmusicSelected}
            sound={bcSound}
            setSound={setBcSound}
          />
        </View>
       
      </ImageBackground>
    </Layout>
  );
};

export default PlayerScreen;
