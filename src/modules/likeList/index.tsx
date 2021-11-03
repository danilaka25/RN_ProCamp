import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useAppSelector } from '../../hooks/navigation';
import {getAllLikes} from '../../dbActions'


export default function ChatScreen() {

  const [likesList, setLikesList] = useState<number[]>([]);
  const userId = useAppSelector(state => state.auth.fireBaseToken);

  const getUserLikes = () => {

    getAllLikes(userId).then((likeIds)=>{
      setLikesList(likeIds)
    })

  }

  useEffect(() => {
    getUserLikes()
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My liked anime</Text>
      {
        likesList.map(function (item, i) {
          { console.log('view', item) }

          return (
            <Text key={i} >{item}</Text>
          )

        })
      }    
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
