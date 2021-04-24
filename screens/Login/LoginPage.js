import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import Header from '../../components/basic/Header';
import Button from '../../components/basic/Button';
import TextInput from '../../components/basic/TextInput';
import Validator from '../../components/basic/utils/Validator';
import { colors } from '../../components/basic/theme';
import userServiceController from '../../controllers/userServiceController';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onLoginPressed = () => {
    const phoneError = Validator.validatePhone(phone.value);
    const passwordError = Validator.validatePassword(password.value);
    // if (!phoneError.isValid || !passwordError.isValid) {
    //   setPhone({value: phone.value, error: phoneError.errorMessage});
    //   setPassword({value: password.value, error: passwordError.errorMessage});
    //   return;
    // }
    let success = data => {
      let user = {};
      delete data.data.Item.passwordHash;
      console.log(data);
      user.authToken = data.token;
      user.data = data.data.Item;
      user = JSON.stringify(user);
      AsyncStorage.setItem('userData', user);
      AsyncStorage.getItem('questionnaireAnswered', (err, value) => {
        if (err) {
          console.log('error');
          return;
        }
        if (value && value === 'true') {
          navigation.navigate('HomePage');
        } else {
          navigation.navigate('QuestionnairePage');
        }
      });
    };
    let failure = data => {
      console.log('GETTING ERROR');
      console.log(data);
    };
    let requestBody = {
      phone: phone.value,
      password: password.value,
      id: '5797ffa0-7919-4940-a5a0-55a132b18650',
    };
    userServiceController.loginUser(requestBody, success, failure);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <Header>Welcome back.</Header>
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={text => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="phone-pad"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => onLoginPressed()}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
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
