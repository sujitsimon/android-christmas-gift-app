import React from 'react';
import { Image,  StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function NavigateScreens() {
  const Tab = createBottomTabNavigator()

  return (
    // <NavigationContainer >
      <Tab.Navigator>  
        <Tab.Screen name="Home" component={myComponent} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const myComponent = () => {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0 }} >
      <View>
        <View style={styles.container}>
          {/* <Image source={require('@expo/snack-static/react-native-logo.png')} style={{ width: 100, height: 100 }} /> */}
          <Text style={{color: '#888', fontSize: 18, alignItems: 'center'}}>To share a photo from your phone with a friend or anyone, just press the button below!</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     alignItems: 'center',
    // justifyContent: 'center',
  },
});