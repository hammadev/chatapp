import React, { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
import { Text, View } from 'react-native';
import { Color } from '../../theme';
import Header from '../../components/Header';
import BodyContainer from '../../components/BodyContainer';
import axios from 'axios';

const ChatScreen = ({ user, route }) => {
  const [messages, setMessages] = useState([]);
  const { chatWith, userName, userType = 'human' } = route.params;

  useEffect(() => {
    //getAllMsg();

    const docId =
      chatWith > user.uid
        ? user.uid + '-' + chatWith
        : chatWith + '-' + user.uid;
    const msgRef = firestore()
      .collection('conversations')
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    msgRef.onSnapshot(querySnap => {
      const allMsg = querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        const dateReceived = data.createdAt
          ? data.createdAt.toDate()
          : new Date();
        return {
          ...data,
          createdAt: dateReceived,
        };
      });

      setMessages(allMsg);
    });
  }, []);

  const onSend = async (messageArray = [])  => {
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: chatWith,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    if (userType == 'bot') {
      console.log(userType);
      let data = {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: msg}]
      }
      let headers ={
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${process.env.gpt_secret_key}`
      }
      await axios.post('https://api.openai.com/v1/chat/completions',data,headers)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      // console.log('else');
      const docId =
        chatWith > user.uid
          ? user.uid + '-' + chatWith
          : chatWith + '-' + user.uid;
      firestore()
        .collection('conversations')
        .doc(docId)
        .collection('messages')
        .add({ ...myMsg, createdAt: firestore.FieldValue.serverTimestamp() });
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Header title={userName} leftIcon="back" />
        <BodyContainer>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: user.uid,
            }}
            renderBubble={props => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: Color.primary,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    },
                    left: {
                      backgroundColor: '#fff',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    },
                  }}
                />
              );
            }}
            renderInputToolbar={props => {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    marginHorizontal: 10,
                    marginVertical: 0,
                    borderTopWidth: 0,
                    elevation: 1,
                  }}
                />
              );
            }}
            renderSend={props => {
              return (
                <Send
                  {...props}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 10,
                    padding: 0,
                  }}
                />
              );
            }}
            renderFooter={props => {
              return <View {...props} height={10} />;
            }}
          />
        </BodyContainer>
      </View>
    </>
  );
};

export default ChatScreen;
