import React, { useEffect, useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

// import LottieView from 'lottie-react-native';
// import tickAnimation from 'D:\Church\Youth_Christmas_Tree\react_native_app\ymca_christmas\src\animation\tick_animation.json';

const DARK_1 = '#3E0F1B';
const DARK_2 = '#913C48';
const LIGHT_1 = '#D9CECE';
const LIGHT_2 = '#AF7D7E';
const LIGHT_3 = '#C19E9F';

export default function Alert(props) {
    const [state, setState] = useState({showAlert: false, alertStatus: 'success', alertText: ' '});
  
    const toggleOverlay = () => {
      props.onCloseClicked()
    };
  
    useEffect(() => {
      console.log('Test', props.alertState);
      setState(props.alertState)
    }, [props]);
  
    return (
      <View>
        <Overlay isVisible={state.showAlert} onBackdropPress={toggleOverlay}>
        {state.alertStatus === 'success' ?
           ( <>
                <Text style={styles.textPrimary}>{state.alertText}</Text>
                <Button
                icon={
                    <Icon
                    name="check-circle"
                    type="font-awesome"
                    color="white"
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                    />
                }
                title="Ok"
                onPress={toggleOverlay}
                buttonStyle={styles.buttonStyle}
                />
            </>) :
            ( <>
                <Text style={styles.textPrimary}>{state.alertText}</Text>
                <Button
                icon={
                    <Icon
                    name="times-circle"
                    type="font-awesome"
                    color="white"
                    size={25}
                    iconStyle={{ marginRight: 10 }}
                    />
                }
                title="Ok"
                onPress={toggleOverlay}
                buttonStyle={styles.buttonStyleFail}
                />
            </>)
        }
          
        </Overlay>
      </View>
    );
  };

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    padding: 10,
    marginBottom:10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textSecondary: {
    textAlign: 'center',
    fontSize: 20,
  },
  buttonStyle: {
      marginLeft:100,
      marginRight:100,
      backgroundColor:'#50C878'
  },
  buttonStyleFail: {
    marginLeft:100,
    marginRight:100,
    backgroundColor:DARK_2
  }
});

