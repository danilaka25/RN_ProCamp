import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native'
import { useMutation, gql } from '@apollo/client'
import { Alert } from 'react-native';

import {Button,  Input} from "../../components/core"; // ImagePicker
import {CreateItem} from "./graphql";

const AddItemScreen = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg')
    const [enabled, setEnabled] = useState(false)
    const [description, setDescription] = useState('')

   // const [create, {data, loading, error}] = useMutation(CreateItem)


      

    const [createItem, {data, loading, error}] = useMutation(CreateItem);
    

    const send = () => {
        // TODO create item with variables
        console.log("createItem", data, loading, error)
         
        // createItem({ 
        //     variables: {  image: "image", title: "82 title 2", description: "some desc 3"}
        // })

        createItem({ 
            variables: { image: "image", createItem: {title: title, description: description}}
        })
    }

    useEffect(() => {
        if (!title || !description ) {
            setEnabled(false)
        } else {
            setEnabled(true)
        }
    }, [title, description])

    return (
        <Container>
            {/* <ImagePicker setImage={setImage} image={image} /> */}
            <Input value={title} onChange={setTitle} />
            <Input value={description} onChange={setDescription} style={{ height: 150 }} />
            <Button onPress={send} enabled={enabled} label={'SAVE ITEM'} />
        </Container>
    );
}

const Container = styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
})

export default AddItemScreen
