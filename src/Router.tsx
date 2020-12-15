import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./screens/Main";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { getCurrentUser } from './helpers/storage';


const Stack = createStackNavigator();

function App() {
  const [isLogin, setLogin] = React.useState(false);

  React.useEffect(() => {
    getCurrentUser()
    .then((user) => {
        if (user) setLogin(true)
    })
    .catch(() => setLogin(false))
  }, [])

  const loginCallback = (value: boolean) => {
      setLogin(value)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin? <Stack.Screen name="Main">
            {(props) => <Main handleLogin={loginCallback} {...props}/>}
        </Stack.Screen> 
        :
        (
        <>
        <Stack.Screen name="Login">
            {(props) => <Login handleLogin={loginCallback} {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="Register">
            {(props) => <Register handleLogin={loginCallback} {...props} />}
        </Stack.Screen>
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;