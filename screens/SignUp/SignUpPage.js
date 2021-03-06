import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../components/basic/Header';
import Button from '../../components/basic/Button';
import TextInput from '../../components/basic/TextInput';
import Validator from '../../components/basic/utils/Validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../components/basic/theme';

import userServiceController from '../../controllers/userServiceController';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const phoneError = Validator.validatePhone(phone.value);
    const passwordError = Validator.validatePassword(password.value);
    const nameError = Validator.validateName(name.value);
    if (!phoneError.isValid || !passwordError.isValid || !nameError.isValid) {
      setPhone({value: phone.value, error: phoneError.errorMessage});
      setPassword({value: password.value, error: passwordError.errorMessage});
      setName({value: name.value, error: nameError.errorMessage});
      return;
    }
    let success = data => {
      console.log(data);
      let user = {};
      user.data = data.data;
      user = JSON.stringify(user);
      console.log(user);
      AsyncStorage.setItem('userData', user);
      navigation.navigate('HomePage');
    };
    let failure = data => {
      console.log('GETTING ERROR');
      console.log(data);
    };
    let requestBody = {
      phone: phone.value,
      password: password.value,
      name: name.value,
    };
    userServiceController.registerUser(requestBody, success, failure);
  };

  return (
    <View style={styles.singUpContainer}>
      <Header>Register with us</Header>
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
  singUpContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
