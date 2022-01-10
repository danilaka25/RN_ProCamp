import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons';

type IconNames =  typeof Ionicons.defaultProps

interface InputProps {
    icon?: IconNames
    visiblePassword?: boolean
    onChange: (value: string) => void
    placeholder: string
    value: string
    error: boolean
    isPassword?: boolean
}

const Input = ({
    icon,
    error,
    placeholder,
    isPassword = false,
    onChange,
}: InputProps) => {

    return (
        <InputContainer error={error}>
            {icon &&
                <InputIcon>
                    <Ionicons name={icon} size={22} color="#841584" />
                </InputIcon>         
            }
            <InputField
                onChangeText={onChange}
                placeholder={placeholder}
                icon={icon}
                secureTextEntry={isPassword}
                autoCapitalize='none'
            />
        </InputContainer>
    );
}

const InputContainer = styled.View<{ error: boolean }>(({ error }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderColor: error ? 'red' : 'rgb(140,90,15)',
    borderWidth: 1,
    width: '100%'
}))

const InputField = styled.TextInput<{ icon: string | undefined }>(({ icon }) => ({
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
