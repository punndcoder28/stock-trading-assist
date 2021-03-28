import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../components/basic/Header';
import Button from '../../components/basic/Button';
import TextInput from '../../components/basic/TextInput';
import Validator from '../../components/basic/utils/Validator';
import {colors} from '../../components/basic/theme';

import userServiceController from '../../controllers/userServiceController';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const phoneError = Validator.validatePhone(phone.value);
    const passwordError = Validator.validatePassword(password.value);
    if (!phoneError.isValid || !passwordError.isValid) {
      setPhone({value: phone.value, error: phoneError.errorMessage});
      setPassword({value: password.value, error: passwordError.errorMessage});
      return;
    }
    let success = data => {
      console.log(data);
      navigation.navigate('HomeStack');
    };
    let failure = data => {
      console.log('GETTING ERROR');
      console.log(data);
    };
    let requestBody = {
      phone: phone.value,
      password: password.value,
    };
    userServiceController.registerUser(requestBody, success, failure);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <Header>Create An Account.</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!phone.error}
        errorText={name.error}
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={text => setPhone({value: text, error: ''})}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="phone-pad"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => onSignUpPressed()}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'blue',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
