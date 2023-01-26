
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

export default function ConfirmationScreen(props) {
    const [state, setState] = useState({showAlert: false, alertStatus: 'success', alertText: ' '});
  
    const onConfirmed = () => {
      props.onConfirmationSceenConfirmed();
    };

    const onRejected = () => {
        props.onConfirmationSceenRejected();
    }

    const onClosedWithoutConfirming = () => {
        props.onClosedWithoutConfirming();
    }
  
    useEffect(() => {
      console.log('Dual Button', props);
      setState({...props.prizeData, ...props.userData});
    }, [props]);
  
    return (
      <View>
        <Overlay isVisible={state.showAlert} onBackdropPress={onClosedWithoutConfirming}>
        <>
        <Text style={styles.textPrimary}>Confirm Data to be added?</Text>
            <Row fullHeight>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Text style={styles.textPrize}>Token No: {state.Token_Number}</Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Text style={styles.textSecondary}>{state.Name}</Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Text style={styles.textPrize}>Prize No: {state.Prize_No}</Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Text style={styles.textPrimary}>{state.Prize_Name}</Text>
                </Col>
            </Row>
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
                    title="Not Delivered"
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
                    title="Delivered"
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
  textPrize: {
    padding: 5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK_1
  },
  textPrimary: {
    padding: 5,
    marginBottom:5,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: DARK_1
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

