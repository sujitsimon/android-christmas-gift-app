import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Col } from 'react-native-responsive-grid-system';
//import  {Icon}  from 'react-native-vector-icons';
//import {Icon} from 'react-native-vector-icons/FontAwesome';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import TextInputIcon from './custom/TextInputIcon';
import { Icon } from 'react-native-elements';
import Axios from './Axios_Component';
import Alert from './alert';
// import { Entypo  } from '@expo/vector-icons';

const DARK_1 = '#3E0F1B';
const DARK_2 = '#913C48';
const LIGHT_1 = '#D9CECE';
const LIGHT_2 = '#AF7D7E';
const LIGHT_3 = '#C19E9F';


const MAX_TOKENS = 300;

const styles = StyleSheet.create({
    inputText: {
        // borderTopLeftRadius: 50,
        // borderBottomRightRadius: 50,
        // borderTopRightRadius: 10,
        // borderBottomLeftRadius: 10,
        textAlign: 'center',
        height: 40
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: DARK_1,
        padding: 5
    },
    container: {
        backgroundColor: LIGHT_3,
        paddingTop: 5,
        paddingBottom: 20,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        margin: 5
    },
    containerInverted: {
        backgroundColor: DARK_1,
        paddingTop: 5,
        paddingBottom: 50,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        margin: 5,
        color: '#fff'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: DARK_2,
    },
    textInputContainer: {
        padding:5
    },
    textInputContainerButton: {
        paddingTop: 25,
        paddingBottom: 15,
    },
    tokendetails: {
        paddingLeft:20,
        fontSize: 18,
        color: LIGHT_3
    },
    tokendetailsPrize: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: LIGHT_1
    },
    tokendetailsName: {
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: LIGHT_1
    },
    headingDetails: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: LIGHT_2,
        padding: 5

    },
    detailsText: {
        color: LIGHT_2
    }
});



export default function DeliveryScreen() {
    const [tokenNumber, setTokenNumber] = useState('');
    const [userData, setUserData] = useState({});
    const [alertState, setAlertState] = useState({showAlert: false, alertStatus: 'success', alertText: ' '});

    const onChangeTokenNumber = (text) => {
        let value = parseInt(text);
        if (!isNaN(value)) {
            setTokenNumber(value);
        } else {
            setTokenNumber(undefined);
            setUserData({});
        }
    }

    useEffect(()=>{
        let timeout = setTimeout(async() => {
            if (tokenNumber) {
                let start_time = performance.now();
                let response = await Axios.get('/getUserDetails', {
                  params: { 
                            token_number: tokenNumber 
                        } 
                  }
                );
                console.log('Time taken to fetch User Name:', performance.now() - start_time);
                console.log(response.data);
                if (response.data)
                    setUserData(response.data);
            }
        }, 200);

        return (() => {
            console.log('Clearing tokenNumber Timeout');
            clearTimeout(timeout);
        })
    }, [tokenNumber]);

    const onSubmitButtonClick = async () => {
        if (!userData.Prize_Selected) {
            setAlertState({showAlert: true, alertStatus: 'fail', alertText: 'Prize Not Yet Selected'});
            return
        }
        if (!userData.Prize_Collected) {
            let data = JSON.stringify({
                "token_number": tokenNumber,
                "update": {
                    "$set": {
                        "Prize_Collected": true,
                        "Process_Completed": true
                    }
                }
            });
            if (tokenNumber) {
                let start_time = performance.now();
                let response = await Axios.post("/updatePrizeDetails", data);
                console.log('Time taken to fetch User Name:', performance.now() - start_time);
                console.log(response.data);
                if (response.data) {
                    console.log('Here');
                    setAlertState({showAlert: true, alertStatus: 'success', alertText: 'Success'});
                } else {
                    setAlertState({showAlert: true, alertStatus: 'fail', alertText: 'Unable to Modify'});
                }
            }
            
        } else {
            setAlertState({showAlert: true, alertStatus: 'fail', alertText: 'Prize Already Collected'});
        }
        setTokenNumber(undefined);
        setUserData({});
    }

    const onCloseClicked = () => {
        setAlertState({showAlert: false, alertStatus: 'success', alertText: ''});
    }

    return(
        <>  
            {alertState.showAlert && 
                <Alert onCloseClicked={onCloseClicked} alertState={alertState}/>
            }
            <View style={styles.container}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.heading}>Price Delivery</Text>
                    </Col>
                </Row>
                <Row fullHeight>
                    <Col xs={2} sm={2} md={2} lg={2}/>
                    <Col xs={8} sm={8} md={8} lg={8}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.inputText}
                            autoCorrect={false}
                            value={tokenNumber === undefined ? '' : tokenNumber.toString()}
                            onChangeText={onChangeTokenNumber}
                            placeholder='Token Number'
                            keyboardType='decimal-pad'
                        />
                    </View>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} sm={4} md={4} lg={4}/>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <View style={styles.textInputContainerButton}>
                            <Button
                                onPress={onSubmitButtonClick}
                                title="Deliver"
                                color= {DARK_2}
                            />
                        </View>
                    </Col>
                </Row>
            </View>
            <View style={styles.containerInverted}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.headingDetails}>Token Details</Text>
                    </Col>
                </Row>
                <Row fullHeight>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.tokendetailsName}>{userData.Name}</Text>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.tokendetailsPrize}>{userData.Prize_Selected}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Token Number:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>{userData.Token_Number}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Prize Number:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>{userData.Prize_Number}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Prize Collected:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>{userData.Prize_Collected ? 'Collected': userData.Prize_Collected === null ? '' : 'Not Collected'}</Text>
                    </Col>
                </Row>
            </View>
        </>
    )
}