import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native'
import { Text, Alert } from 'react-native';
import { useAppSelector } from '../../hooks/navigation';
import { Button, Input } from "../../components/core";

import { getUserPersonalData, updateUserData } from '../../dbActions'

const EditProfile = () => {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const userId = useAppSelector(state => state.auth.fireBaseToken);

    const getUserContacts = (userId) => {
        getUserPersonalData(userId).then((userData) => {
            setPhone(userData.phone)
            setAddress(userData.address)
        })
    }

    useEffect(() => {
        getUserContacts(userId)
    }, [])


    const saveUserData = () => {
        console.log("saveUserData")
        updateUserData(userId, 'phone', phone)
        updateUserData(userId, 'address', address)
        Alert.alert("You data saved")
    }

    return (
        <Container>
            <FormWrapper>
                <TITLE>EDIT DATA</TITLE>
                <Input name={phone ? phone : 'Enter your phone'} value={phone} onChange={setPhone} />
                <Input name={address ? address : 'Enter your address'} value={address} onChange={setAddress} />
                <Button label={'Save data'} onPress={saveUserData} />
            </FormWrapper>
        </Container>
    );
}

const TITLE = styled.Text({
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
})

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

export default EditProfile
