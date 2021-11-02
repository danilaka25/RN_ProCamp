import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons';


interface InputProps {
    icon?: string | boolean
    visiblePassword?: boolean
    onChange: (value: string) => void
}

const Input = ({
    icon = false,
    error,
    name,
    isPassword = false,
    onChange,
}: InputProps) => {
    return (
        <InputContainer
            error={error}
            visiblePassword      
        >
            {icon ?
                <InputIcon >
                    <Ionicons name={icon} size={22} color="#841584" />
                </InputIcon>
                :
                null
            }

            <InputField
                onChangeText={onChange}
                placeholder={name}
                icon={icon}
                secureTextEntry={isPassword}
                autoCapitalize='none'
            />
        </InputContainer>
    );
}

interface InputContainerProps {
    error: boolean
}

interface TextInputProps {
    icon: string,
}

const InputContainer = styled.View(({ error }: InputContainerProps) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderColor: error ? 'red' : 'rgb(140,90,15)',
    borderWidth: 1,
    width: '100%'
}))

const InputField = styled.TextInput(({ icon }: TextInputProps) => ({
    paddingLeft: icon ? 40 : 10,
    height: 35,
    width: '100%',

}))

const InputIcon = styled.View({
    position: 'absolute',
    left: 9,
    zIndex: 9
})


export default Input
