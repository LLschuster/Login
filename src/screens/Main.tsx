import { Button } from 'native-base';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { removeCurrentUser } from '../helpers/storage';

interface MainProps {
    handleLogin: (value: boolean) => void
}

const Main = (props: MainProps) => {

    const handleLogout = async() => {
        await removeCurrentUser()
        props.handleLogin(false);
    }

    return (
    <View style={styles.container}>
      <Text>Main</Text>
      <Button
        onPress={handleLogout}
      >
          <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {}
});
