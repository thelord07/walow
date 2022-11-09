import {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator';
import {Picker} from '@react-native-picker/picker';

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Capability,
  Event,
} from 'react-native-track-player';
import {useOnTogglePlayback} from '../../../hooks/useOnTogglePlayback';

const Player = ({song}) => {
  const progressRef = useRef();
  const progress = useProgress();
  const state = usePlaybackState();
  const playSong = useOnTogglePlayback();

  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  const chargeMusic = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'trackId',
      url: 'https://focusmind.net/dummy/voice.mp3',
      title: 'Track Title',
      artist: 'Track Artist',
    });
  };

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      capabilities: [Capability.JumpBackward, Capability.JumpForward],
      compactCapabilities: [Capability.JumpBackward, Capability.JumpForward],
    });
  }, []);

  useEffect(() => {
    TrackPlayer.add({
      id: 'trackId',
      url: song.sound,
      title: 'Track Title',
      artist: 'Track Artist',
    });
    setIsLoading(false);
  }, [song]);

  const playMusic = async () => {
    await playSong();
    await setPlay(!play);
    !play ? progressRef.current.play() : progressRef.current.pause();
  };

  const forward = async () => {
    if ((await TrackPlayer.getPosition()) < progress.duration) {
      const position = (await TrackPlayer.getPosition()) + 10;
      TrackPlayer.seekTo(position);
    }
  };

  const backward = async () => {
    if ((await TrackPlayer.getPosition()) >= 10) {
      const position = (await TrackPlayer.getPosition()) - 10;
      TrackPlayer.seekTo(position);
    }
  };

  const setSpeed = async (speed) => {
    console.log(selectedSpeed)
    setSelectedSpeed(speed)
    await TrackPlayer.setRate(parseInt(speed))
  };

  /*  const playPriMusic =  () => {
      setPlay(true)
      progressRef.current.reAnimate();
    try {
      SoundPlayer.playUrl(song.sound);
      getInfo()
    } catch (error) {
      console.log(`cannot play the sound file`, e);
    }
  }; */

  /*   const stopPriMusic = () => {
    SoundPlayer.pause();
    progressRef.current.pause();
    setPlay(false);
  }; */

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View className="flex flex-row items-center mt-16">
            <View className="mr-12 justify-center items-center realtive">
              <TouchableOpacity
                onPress={backward}
                className="justify-center items-center realtive">
                <AntDesign
                  name="reload1"
                  style={{
                    fontSize: 30,
                    color: 'white',
                    transform: [{scaleX: -1}],
                  }}
                />
                <Text className="absolute text-white text-xs top-2">10</Text>
              </TouchableOpacity>
            </View>
            <View className="relative justify-center items-center">
              <View className="absolute flex-1  justify-center items-center">
                <CircularProgress
                  ref={progressRef}
                  initialValue={0}
                  value={100}
                  radius={60}
                  progressValueColor={'transparent'}
                  activeStrokeColor={'white'}
                  inActiveStrokeColor={'rgb(229, 232, 232)'}
                  inActiveStrokeWidth={5}
                  duration={61200}
                />
              </View>

              <View className=" rounded-full">
                <TouchableOpacity onPress={playMusic}>
                  {!play ? (
                    <AntDesign
                      name="play"
                      style={{fontSize: 70, color: 'white'}}
                    />
                  ) : (
                    <AntDesign
                      name="pause"
                      style={{fontSize: 70, color: 'white'}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View className="ml-12 justify-center items-center realtive">
              <TouchableOpacity
                onPress={forward}
                className="justify-center items-center realtive">
                <AntDesign
                  name="reload1"
                  style={{fontSize: 30, color: 'white'}}
                />
                <Text className="absolute text-white text-xs top-2">10</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text className="text-center text-white mt-7">
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .slice(14, 19)}
            </Text>
            <View className="-mt-16">
                <Picker
                selectedValue={selectedSpeed}
                onValueChange={(itemValue, itemIndex) =>
                    setSpeed(itemValue)
                }
                itemStyle={{color:'white', fontSize:16}}
                >
                    <Picker.Item   label="1.0x" value="1" />
                    <Picker.Item label="1.5x" value="1.5" />
                    <Picker.Item label="2.0x" value="2" />
                </Picker>
              
            </View>
          </View>
          <View className="absolute -bottom-44 w-screen justify-center items-center -left-20 ">
            <Text className="text-white">Volumen</Text>
        </View>
        </>
      )}
    </View>
  );
};

export default Player;
