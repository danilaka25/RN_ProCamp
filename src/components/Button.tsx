import React from 'react'
import styled from 'styled-components/native'
import { GestureResponderEvent } from 'react-native'

// coments
// coments 2

interface ButtonProps {
    label?: string
    enabled?: boolean
    onPress: (event: GestureResponderEvent) => void
    transparent? : boolean
}

const Button = ({
        label = 'CLICK',
        enabled = true,
        onPress,
        transparent = false,
    }: ButtonProps) => {
    return (     
        <ButtonContainer disabled={!enabled} onPress={onPress} transparent={transparent}>
            <ButtonTitle transparent={transparent}>{label}</ButtonTitle>
        </ButtonContainer>
    );
}

interface ButtonContainerProps {
    transparent: boolean
}

const ButtonContainer = styled.TouchableOpacity(({ transparent }: ButtonContainerProps) => ({
    backgroundColor: transparent ? 'white' :  '#841584',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
    borderWidth: transparent ? 2 : 0,
    borderColor: transparent ? '#841584' :  '#fff',
}))

const ButtonTitle = styled.Text(({ transparent }: ButtonContainerProps) => ({ 
    color: transparent ? '#841584' :  'white',
    fontSize: 18,
}))

export default Button
