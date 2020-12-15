import * as React from 'react';
import {View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import {Item, Form, Input, Label, Icon, Button, Text} from "native-base";
import FormInput from '../components/FormInput';
import { EMAIL_REGEX } from '../helpers/constants';
import {loginUserWithCredentials, saveCredentials, setCurrentUser, userCredential} from "../helpers/storage"


interface LoginProps {
    navigation: any
    handleLogin: (value: boolean) => void
}


const Login = (props: LoginProps) => {
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const validateEmail = (email: string) => {
       setIsEmailValid(EMAIL_REGEX.test(email.toLowerCase()));
       setEmail(email);
    }

    const validatePassword = (password: string) => {
       setIsPasswordValid(password.length > 0);
       setPassword(password);
    }

    const handleSubmit = async () => {
        let user = {} as userCredential;
        if (isEmailValid && isPasswordValid){
            user = {
                email,
                password
            };
            const result = await loginUserWithCredentials(user);
            if (!result){
                return Alert.alert("Error", "Email or password is invalid")
            }
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
          
          <Button 
            info 
            style={{width: "70%", alignSelf: "center", marginTop: 25, justifyContent: "center"}}
            onPress={handleSubmit}
          >
              <Text style={{alignSelf: "center"}}>Login</Text>
          </Button>

          <Button 
            transparent 
            onPress={handleGoToRegisterScreen}
            style={{width: "70%", alignSelf: "center", marginTop: 25, justifyContent: "center" }}>
              <Text>Dont have an account</Text>
          </Button>
        
      </Form>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
      width: "100%",
      height: "100%",
     justifyContent: "center",
     alignContent: "center",
  }
});
