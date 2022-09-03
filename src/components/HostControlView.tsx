/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import chatContext, {controlMessageEnum} from './ChatContext';
import ColorContext from './ColorContext';
import SecondaryButton from '../atoms/SecondaryButton';

// Auraqule
import {PollContext} from './PollContext';
import PrimaryButton from '../atoms/PrimaryButton';

const HostControlView = () => {
  const {sendControlMessage} = useContext(chatContext);
  const {primaryColor} = useContext(ColorContext);
  const {
    question,
    setQuestion,
    answers,
    setAnswers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(PollContext);
  return (
    <>
      <Text style={style.heading}>Host Controls</Text>
      <View>
        <View style={style.btnContainer}>
          <SecondaryButton
            onPress={() => sendControlMessage(controlMessageEnum.muteAudio)}
            text={'Mute all audios'}
          />
        </View>
        <View style={style.btnContainer}>
          <SecondaryButton
            onPress={() => sendControlMessage(controlMessageEnum.muteVideo)}
            text={'Mute all videos'}
          />
        </View>
        <Text style={style.heading}>Create a Poll</Text>
        <View style={{marginTop: 20}}>
          <TextInput
            style={{padding: 4, color: '#ffffff'}}
            value={question}
            onChangeText={setQuestion}
            placeholder="Poll Question"
          />
          <br />
          {answers.map((answer: any, i: number) => (
            <div key={i}>
              <br />
              <TextInput
                style={{padding: 4, color: '#ffffff'}}
                value={answer.option}
                onChangeText={(value: any) =>
                  setAnswers([
                    ...answers.slice(0, i),
                    {option: value, votes: 0},
                    ...answers.slice(i + 1),
                  ])
                }
                placeholder={`Poll Answer ${i + 1}`}
              />
            </div>
          ))}
          <View style={style.btnContainer}>
            <PrimaryButton
              onPress={() => {
                setIsModalOpen(true);
                sendControlMessage(controlMessageEnum.initiatePoll);
              }}
              text="Start Poll"
            />
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    // marginBottom: 20,
    alignSelf: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default HostControlView;