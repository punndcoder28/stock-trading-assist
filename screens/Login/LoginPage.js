import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Logo from '../../components/basic/Logo';
import Header from '../../components/basic/Header';
import Button from '../../components/basic/Button';
import TextInput from '../../components/basic/TextInput';
import Validator from '../../components/basic/utils/Validator';

export default function LoginScreen({navigation}) {
  const [phone, setPhone] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    const emailError = Validator.validatePhone(phone.value);
    const passwordError = Validator.validatePassword(password.value);
    if (emailError || passwordError) {
      setPhone({...phone, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={text => setPhone({value: text, error: ''})}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        autoCompleteType="phone"
        textContentType="phone"
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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => {}}>
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
