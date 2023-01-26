import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Heading from './src/components/header';
import MainScreen from './src/components/main_screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DeliveryScreen from './src/components/deliveryScreen';
import StatusScreen from './src/components/statusScreen';

const DARK_1 = '#3E0F1B';
const DARK_2 = '#913C48';
const LIGHT_1 = '#D9CECE';
const LIGHT_2 = '#AF7D7E';
const LIGHT_3 = '#C19E9F';

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F00'
    },
    tabStyle: {
        flex: 1,
        height:50,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleStatus: {
        backgroundColor: DARK_2,
        fontSize:24,
        fontWeight:'bold',
    },
    stylePrize: {
        backgroundColor: LIGHT_2,
        fontSize:24,
        fontWeight:'bold',
    },
    styleDelivery: {
        backgroundColor: LIGHT_3,
        fontSize:24,
        fontWeight:'bold',
    },
    textStyle: {
        fontWeight: 'normal'
    },
    white: {
        color: '#fff'
    },
    gray: {
        color: '#222'
    }
});



function StatusScreenLocal() {
  return (
    <>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Heading/>
        </View>
        <View style={{ flex: 9, justifyContent: 'flex-start', alignItems: 'center' }}>
            <StatusScreen key={new Date()}/>
        </View>
    </>
  );
}

function PrizeScreen() {
  return (
    <>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <Heading/>
        </View>
        <View style={{ flex: 9, justifyContent: 'flex-start', alignItems: 'center' }}>
            <MainScreen/>
        </View>
    </>
  );
}

function DeliveryScreenLocal() {
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Heading/>
            </View>
            <View style={{ flex: 9, justifyContent: 'flex-start', alignItems: 'center' }}>
                <DeliveryScreen/>
            </View>
        </>
    );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabStyle, (label === 'Status') ? styles.styleStatus : (label === 'Prize') ? styles.stylePrize : styles.styleDelivery]}
          >
            <Text style={[styles.textStyle, isFocused ? styles.white : styles.gray ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Status" component={StatusScreenLocal} options={{headerShown:false}}/>
        <Tab.Screen name="Prize" component={PrizeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Delivery" component={DeliveryScreenLocal} options={{headerShown:false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}