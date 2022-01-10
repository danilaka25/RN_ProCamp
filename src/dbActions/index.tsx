import { firebase, store } from '../config/firebase';

interface iAnimeItem {
  item: {
    id: string
    title: {
      romaji: string
    }
  }
}

const saveLikesToDB = (action: string, props: iAnimeItem, userId: string) => {

  if (action == 'save') {

    store
      .collection('likes')
      .doc(userId)
      .set(
        { [props.item.id]: props.item.title.romaji }, { merge: true }
      )

  } else {

    let docRef = store.collection('likes').doc(userId)
    docRef.update({
      [props.item.id]: firebase.firestore.FieldValue.delete()
    });
  }

}

interface LikesShema {
  [index: string]: string;
}

const getAllLikes = function (userId: string) : Promise<void  | LikesShema >    {

   return store.collection("likes").where(firebase.firestore.FieldPath.documentId(), '==', userId)
    .get()
    .then((querySnapshot) => {

      let likeIds = {}

      querySnapshot.forEach((doc) => { 
        likeIds = Object(doc.data()) 
      })
      return likeIds

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  }

type userData = {
  address?: string,
  phone?: string,
  email?: string,
  lastSeenPage?: number,
  avatarUrl?: string,
  token?: string

}

const getUserPersonalData = function (userId: string) :   Promise<void | userData>{

  return store.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', userId)
    .get()
    .then((querySnapshot) => {


      let userData: userData = {}

      querySnapshot.forEach((doc) => { userData = doc.data() });

      return userData


    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

}

const updateUserData = (userId: string, key: string, value: string) => {

  store.collection('users')
    .doc(userId)
    .set(
      { [key]: value }, { merge: true }
    )

}

export { saveLikesToDB, getAllLikes, getUserPersonalData, updateUserData }
