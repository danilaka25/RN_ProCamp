import { firebase, store } from '../config/firebase';

const saveLikesToDB = (action: String, props: Object, userId: String) => {

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


const getAllLikes = (userId: String) => {

  return store.collection("likes").where(firebase.firestore.FieldPath.documentId(), '==', userId)
    .get()
    .then((querySnapshot) => {
      let likeIds: Array<number> = []
      querySnapshot.forEach((doc) => {
        likeIds = Object.values(doc.data());
      });
      console.log(likeIds)
      return likeIds
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

}

const getUserPersonalData = (userId: String) => {

  return store.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', userId)
    .get()
    .then((querySnapshot) => {

      let userData: Array<number> = {}

      querySnapshot.forEach((doc) => {
        userData = doc.data()
      });

      return userData

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

}

const updateUserData = (userId: String, key: String, value: String) => {

  store.collection('users')
    .doc(userId)
    .set(
      { [key]:value }, { merge: true }
    )

}

export { saveLikesToDB, getAllLikes, getUserPersonalData, updateUserData }
