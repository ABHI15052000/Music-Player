import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {songs} from '../assets/Data';
import MusicItem from '../Component/MusicItem';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const setUpPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  } catch (e) {
    console.log(e);
  }
};

const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setUpPlayer();
  }, []);

  const renderItem = ({item}) => (
    <MusicItem item={item} onPress={() => setSelectedItem(item)} />
  );

  const closeModal = () => {
    setSelectedItem(null);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSliderChange = value => {
    setSliderValue(value);
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'black',
      }}>
      <View style={{marginVertical: 15}}>
        <Text
          style={{
            width: '90%',
            fontWeight: '500',
            fontSize: 28,
            alignSelf: 'center',
          }}>
          Music Player
        </Text>
      </View>
      <FlatList data={songs} renderItem={renderItem} />

      <Modal
        visible={selectedItem !== null}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          {selectedItem && (
            <View>
              <TouchableOpacity
                style={{margin: 16, marginBottom: 30}}
                onPress={closeModal}>
                <Text style={{color: 'white', fontSize: 18}}>Close</Text>
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{height: '62%', width: '70%', borderRadius: 12}}
                  source={{uri: selectedItem.artwork}}
                />
                <View style={{padding: 16, alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8}}>
                    {selectedItem.title}
                  </Text>
                  <Text
                    style={{fontSize: 18, fontWeight: '400', marginBottom: 8}}>
                    {selectedItem.artist}
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: '300'}}>
                    Album: {selectedItem.album}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Slider
                    style={{width: '90%', height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="white"
                    thumbTintColor="red"
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                  />
                </View>
                <View
                  style={{
                    width: '88%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <Text style={{fontSize: 15}}>
                    {formatTime(selectedItem.duration * sliderValue)}
                  </Text>

                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: 'white',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <Ionicons name="play-skip-back-outline" size={38} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUpPlayer();
                        togglePlayBack(playBackState);
                      }}>
                      <Ionicons
                        name={
                          playBackState === State.Playing
                            ? 'ios-play-circle'
                            : 'ios-pause-circle'
                        }
                        size={75}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="play-skip-forward-outline" size={38} />
                    </TouchableOpacity>
                  </View>

                  <Text style={{fontSize: 15}}>
                    {formatTime(selectedItem.duration)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MusicPlayer;
