
import React, { useEffect, useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { Row, Col } from 'react-native-responsive-grid-system';
// import LottieView from 'lottie-react-native';
// import tickAnimation from 'D:\Church\Youth_Christmas_Tree\react_native_app\ymca_christmas\src\animation\tick_animation.json';

const DARK_1 = '#3E0F1B';
const DARK_2 = '#913C48';
const LIGHT_1 = '#D9CECE';
const LIGHT_2 = '#AF7D7E';
const LIGHT_3 = '#C19E9F';

export default function DualButtonAlert(props) {
    const [state, setState] = useState({showAlert: false, alertStatus: 'success', alertText: ' '});
  
    const onConfirmed = () => {
      props.onConfirmed();
    };

    const onRejected = () => {
        props.onRejected();
    }
  
    useEffect(() => {
      console.log('Dual Button', props.alertState);
      setState(props.alertState)
    }, [props]);
  
    return (
      <View>
        <Overlay isVisible={state.showAlert} onBackdropPress={onRejected}>
        <>
        <Text style={styles.textPrimary}>{state.alertText}</Text>
            <Row>
                <Col xs={6} sm={6} md={6} lg={6}>
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
                    title="Cancel"
                    onPress={onRejected}
                    buttonStyle={styles.buttonStyleFail}
                    />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
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
                    onPress={onConfirmed}
                    buttonStyle={styles.buttonStyle}
                    />
                </Col>
            </Row>
        </>
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
      marginLeft:20,
      marginRight:20,
      backgroundColor:'#50C878'
  },
  buttonStyleFail: {
    marginLeft:20,
    marginRight:20,
    backgroundColor:DARK_2
  }
});

