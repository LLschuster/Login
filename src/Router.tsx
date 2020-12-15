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
    .then(() => setLogin(true))
    .catch(() => setLogin(false))
  }, [])

  const loginCallback = (value: boolean) => {
      setLogin(value)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin? <Stack.Screen name="Main" component={(props) => <Main handleLogin={loginCallback} />}/> 
        :
        (
        <>
        <Stack.Screen name="Login" component={(props) => <Login handleLogin={loginCallback} />}/>
        <Stack.Screen name="Register" component={(props) => <Register handleLogin={loginCallback} />}/>
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;