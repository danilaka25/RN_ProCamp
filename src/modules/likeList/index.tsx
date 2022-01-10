import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useAppSelector } from '../../hooks/navigation';
import { getAllLikes } from '../../dbActions'

export default function ChatScreen() {

  interface LikesShema {
    [index: string]: string;
  }

  const [likesList, setLikesList] = useState<LikesShema | void | null>(null);
  const userId = useAppSelector(state => state.auth.fireBaseToken);

  const getUserLikes = () => {
    if (userId !== null) {
      getAllLikes(userId).then((likeIds) => {
        setLikesList(likeIds)
      })
    }
  }

  useEffect(() => {
    getUserLikes()
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My liked anime</Text>

      {likesList && Object.keys(likesList).map((keyName, i) => (
        <Text key={i} >{likesList[keyName]}</Text>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
