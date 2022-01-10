import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View , Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 
type IconNames =  typeof Ionicons.defaultProps

interface Props {
  icon: IconNames;
  text: string;
}

const ContactsField = ({...props }: Props) => (
  <View style={styles.fieldWrapper}>
      {props.icon ?  <Ionicons name={props.icon} size={22} color="#000" style={styles.fieldIcon} /> : null}
      <Text>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  fieldWrapper: {
    backgroundColor: '#f3efef',
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 5,
    marginBottom: 15
  },
  fieldIcon: {
    marginRight: 10
  }
});

export default ContactsField;