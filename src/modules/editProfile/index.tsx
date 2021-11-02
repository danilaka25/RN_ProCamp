import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native'
import { Alert, Text } from 'react-native';
import { useAppSelector } from '../../hooks/navigation';
import {Button,  Input} from "../../components/core";
import { store, firebase } from '../../config/firebase';


const AddItemScreen = () => {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [simpleText, setSimpleText] = useState('')
    const userId = useAppSelector(state => state.auth.fireBaseToken);

    const [image, setImage] = useState('https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg')
  

   // const [create, {data, loading, error}] = useMutation(CreateItem)
      
    const getUserPersonalData = () => {
        store.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', userId)
        .get()
        .then((querySnapshot) => {
          let userData: Array<number> = []
          querySnapshot.forEach((doc) => {
            
            //userData = Object.values(doc.data());
            //userData = Object.keys(doc.data());

            // console.log(Object.keys(doc.data()))

            // if(Object.keys(doc.data()) == 'phone') {

            //     setPhone(Object.values(doc.data()))
            // }

          });
       
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
     

    const send = () => {
     
    }

    useEffect(() => {
        getUserPersonalData()
    }, [])

    return (
        <Container>
            <FormWrapper>
                {/* <ImagePicker setImage={setImage} image={image} /> */}
                <Text>{phone}</Text>
                <Input name='Your phone' value={phone} onChange={setPhone} />
                <Input name='Your address' value={address} onChange={setAddress} />
                <Button onPress={send}  label={'SAVE ITEM'} />
            </FormWrapper>
        </Container>
    );
}

const Container = styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff' 
})

const FormWrapper = styled.View({
    backgroundColor: '#ccc',
    width: '80%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
 
 
})

export default AddItemScreen
