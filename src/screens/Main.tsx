import { Text ,Button } from 'native-base';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { removeCurrentUser, userCredential, getCurrentUser } from '../helpers/storage';


interface MainProps {
    handleLogin: (value: boolean) => void
}

const Main = (props: MainProps) => {

  const [currentUser, setCurrentUser] = React.useState({} as userCredential);

  React.useEffect(() => {
    getCurrentUser()
    .then((user) => {
        if (user) setCurrentUser(user)
    })
    .catch(() => setCurrentUser({} as userCredential))
  }, [])

    const handleLogout = async() => {
        await removeCurrentUser()
        props.handleLogin(false);
    }

    if (!currentUser){
        return (
            <View style={styles.container}>
                <Text>Weard, user could not be retrieved</Text>
            </View>
        )
    }
    return (
    <View style={styles.container}>
      <Text style={styles.textInputs}>User Info</Text>
      <Text style={styles.textInputs}>Email: {currentUser.email}</Text>
      <Text style={styles.textInputs}>FirstName:  {currentUser.firstname}</Text>
      <Text style={styles.textInputs}>Lastname: {currentUser.lastname}</Text>
      <Text style={styles.textInputs}>Phone: {currentUser.phone}</Text>
      <Button
        style={styles.logoutbtn}
        onPress={handleLogout}
      >
          <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center"
  },
  textInputs: {
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  logoutbtn: {
    width: "70%",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 20,
    alignSelf: "center"
  }
});
