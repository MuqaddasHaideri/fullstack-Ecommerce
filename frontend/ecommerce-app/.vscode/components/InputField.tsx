import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = TextInputProps & {
  icon: string;
};

const InputField = ({ icon, secureTextEntry, ...rest }: Props) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={20} color="#888" />
      <TextInput
        style={styles.input}
        secureTextEntry={hidePassword}
        placeholderTextColor={Colors.smallText}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <MaterialIcons
            name={hidePassword ? 'visibility-off' : 'visibility'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: Colors.text,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor:Colors.containers,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 16,
    color:Colors.text,
  },
});