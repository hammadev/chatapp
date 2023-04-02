import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Color, Font, GlobalStyle, Window } from '../../theme';
import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';
import BodyContainer from '../../components/BodyContainer';
import { Avatar } from 'react-native-paper';

const Home = ({ user, navigation }) => {

  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allUsers = querySnap.docs.map(docSnap => docSnap.data());
    setUsers([
      {
        name: 'ChatGPT', email: 'openai@gmail.com', uid: "iCLedjlhM6PeDzdln4I19cOpA5a6", avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj1CxX_ERPBrJRQ6J-f5rDLPq-1WF5vjqVuUOaFIr4_h_xhZE3HToRLJaN1E1EXFUNyE&usqp=CAU', type: 'bot'
      }
      , ...allUsers]);

    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const UsersView = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() =>
          navigation.navigate('Chat', { name: item.name, chatWith: item.uid, userName: item.name, userType: item.type })
        }>
        {
          item.avatar ?
            <Image source={{ uri: item.avatar }} style={styles.profileAvatar} />
            :
            <Avatar.Text size={54} labelStyle={{ color: '#fff' }} label={item.name.substr(0, 2)} />
        }
        <View style={styles.profileDetailContainer}>
          <Text style={styles.profileName}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightIcon = [
    {
      iconName: 'logout',
      iconFamily: 'MaterialIcons',
      onPressFunction: () => auth().signOut(),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header title="Chats" rightIcon={rightIcon} />

      <BodyContainer>
        <FlatList
          data={users}
          renderItem={UsersView}
          keyExtractor={item => item.uid}
          ListEmptyComponent={
            loading ?
              <ActivityIndicator size={'large'} color={Color.primary} />
              :
              <Text style={{ ...GlobalStyle.heading, fontSize: Window.fixPadding * 1.4, textAlign: 'center', marginTop: Window.fixPadding * 2 }}>No Conversation Found!</Text>
          }
        />
      </BodyContainer>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    margin: 3,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 54,
    height: 54,
    borderRadius: 54,
    backgroundColor: Color.primary,
  },
  profileDetailContainer: {
    paddingLeft: 20,
  },
  profileName: {
    color: '#000',
    fontSize: 18,
    fontFamily: Font.semibold,
    lineHeight: 20,
  },
});
