import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const MusicItem = ({item, onPress}) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        marginBottom: '3%',
        borderBottomWidth: 2,
        borderBottomColor: '#242424',
        alignSelf: 'center',
      }}
      onPress={onPress}>
      <View style={{marginRight: '2%'}}>
        <Image
          style={{height: 80, width: 80, borderRadius: 15, marginBottom: '14%'}}
          source={{uri: item.artwork}}
        />
      </View>
      <View
        style={{
          width: '75%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '2%',
        }}>
        <View>
          <Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
          <Text style={{fontSize: 13, fontWeight: '300'}}>{item.artist}</Text>
        </View>
        <View>
          <Text style={{fontSize: 15}}>{formatTime(item.duration)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MusicItem;
