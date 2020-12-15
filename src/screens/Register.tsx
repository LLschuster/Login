import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import {Item, Form, Input, Label, Icon, Button, Text} from "native-base";
import FormInput from '../components/FormInput';
import { EMAIL_REGEX } from '../helpers/constants'
import {saveCredentials, setCurrentUser, userCredential} from "../helpers/storage"
import { getPasswordStrengthRate } from '../helpers/util';

interface RegisterProps {
    navigation: any,
    handleLogin: (value: boolean) => void
}

const Register = (props: RegisterProps) => {
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [isPhoneValid, setIsPhoneValid] = React.useState(false);
    const [phone, setPhone] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");

    const validateEmail = (email: string) => {
       setIsEmailValid(EMAIL_REGEX.test(email.toLowerCase()));
       setEmail(email);
    }

    const validatePassword = (password: string) => {
       const passwordStrength = getPasswordStrengthRate(password);
       console.log({passwordStrength})
       setIsPasswordValid(passwordStrength > 2);
       setPassword(password);
    }
    
    const validatePhone = (phone: string) => {
        setIsPhoneValid(phone.length > 6)
        setPhone(phone);
    }

    const handleSubmit = async () => {
        let user = {} as userCredential;
        if (isEmailValid && isPasswordValid && isPhoneValid){
            user = {
                email,
                password,
                phone,
                firstname,
                lastname
            };
            const result = await saveCredentials(user);
            if (!result){
                return Alert.alert("Error", "Register was unsuccessful, try again")
            }
            await setCurrentUser(user);
            props.handleLogin(true);
            return;
        }
        Alert.alert("Error", "Your information is still invalid");
    }

    const handleGoToRegisterScreen = () => {
        console.log(props)
        props.navigation.navigate("Register")
    }
  return (
    <SafeAreaView style={styles.container}>
      <Form style={{}}>
          <FormInput 
            label="Email"
            placeholder="Give me your email please"
            handleInputChange={validateEmail}
            isValid={email.length>0? isEmailValid : undefined}
          />
          <FormInput 
            label="Password"
            placeholder="your Password please"
            handleInputChange={validatePassword}
            isValid={password.length>0? isPasswordValid : undefined}
            otherProps={{secureTextEntry: true}}
          />
          <FormInput 
            label="Phone"
            placeholder="your Phonenumber please"
            handleInputChange={validatePhone}
            isValid={phone.length>0? isPhoneValid : undefined}
          />
          <FormInput 
            label="Firstname"
            placeholder="your name please"
            handleInputChange={setFirstname}
            isValid={firstname.length > 0? true : undefined}
          />
          <FormInput 
            label="Lastname"
            placeholder="your lastname please"
            handleInputChange={setLastname}
            isValid={lastname.length>0? true : undefined}
          />
          
          <Button 
            info 
            style={{width: "70%", alignSelf: "center", marginTop: 25, justifyContent: "center"}}
            onPress={handleSubmit}
          >
              <Text style={{alignSelf: "center"}}>Sign in</Text>
          </Button>

          <Button 
            transparent 
            onPress={handleGoToRegisterScreen}
            style={{width: "70%", alignSelf: "center", marginTop: 25, justifyContent: "center" }}>
              <Text>already have an account, login</Text>
          </Button>
        
      </Form>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {}
});
