import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
  },
});