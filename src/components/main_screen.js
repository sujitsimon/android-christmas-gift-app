import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Col } from 'react-native-responsive-grid-system';
//import  {Icon}  from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import TextInputIcon from './custom/TextInputIcon';
import ScanScreen from './qrcode_screen';
import AlertPrize from './alert_screen';
import Axios from './Axios_Component';
import Alert from './alert';
import ConfirmationScreen from '../confirmationScreen';
import DualButtonAlert from './dualButtonAlert';
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
        textAlign: 'left',
        height: 40,
        borderWidth: 0,
        flex: 9,
        backgroundColor: '#fff',
        padding: 0
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
        paddingBottom: 60,
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
        padding: 15
    },
    textInputContainerButton: {
        paddingTop: 25,
        paddingBottom: 15,
    },
    tokendetails: {
        paddingLeft: 20,
        fontSize: 18,
        color: LIGHT_3
    },
    tokendetailsName: {
        textAlign: 'center',
        fontSize: 24,
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
    iconClass: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderBox: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        margin: 5
    },
    camera: {
        right: 10
    },
    leftIcon: {
        left: 1
    },
    closeIcon: {
        display: 'flex',
        position: 'absolute',
        right: 10
    },
    detailsText: {
        color: LIGHT_2
    }
});

function Box(props) {
    return (
        <View style={styles.borderBox}>
            {props.children}
        </View>
    )
}

export default function MainScreen() {
    const [tokenNumber, setTokenNumber] = useState(undefined);
    const [prizeNumber, setPrizeNumber] = useState(undefined);
    const [showQRScreen, setShowQRScreen] = useState(false);
    const [currentPrizeDetails, setCurrentPrizeDetails] = useState({ showAlert: false });
    const [userData, setUserData] = useState({})
    const [alertState, setAlertState] = useState({ showAlert: false, alertStatus: 'success', alertText: ' ' });
    const [dualButtonAlertState, setDualButtonAlertState] = useState({ showAlert: false, alertStatus: 'success', alertText: ' ' });
    const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);

    const onChangeTokenNumber = (text) => {
        let value = parseInt(text);
        if (!isNaN(value)) {
            setTokenNumber(value);
        } else {
            setTokenNumber(undefined);
            setUserData({});
        }
    }

    const checkIfPrizeAlreadySelected = async () => {
        if (prizeNumber) {
            let start_time = performance.now();
            let response = await Axios.get("isPrizeSelected", {
                params: { 
                        prize_number: prizeNumber 
                        } 
                });
            console.log('Time taken to fetch User Name:', performance.now() - start_time);
            console.log(response.data);
            return response.data
        }
    }

    useEffect(() => {
        let timeout = setTimeout(async () => {
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

    useEffect(() => {
        let timeout = setTimeout(async () => {
            if (prizeNumber) {
                let start_time = performance.now();
                let response = await Axios.get('/getPrizeDetails',{
                  params: { 
                            prize_number: prizeNumber 
                        } 
                  }
                );
                console.log('Time taken to fetch Prize Name:', performance.now() - start_time);
                console.log(response.data);
                if (response.data)
                    setCurrentPrizeDetails({ ...response.data, showAlert: false });
            }
        }, 200);

        return (() => {
            console.log('Clearing Prize Timeout');
            clearTimeout(timeout);
        })
    }, [prizeNumber])

    const onChangePrizeNumber = (text) => {
        let value = parseInt(text);
        if (!isNaN(value)) {
            setPrizeNumber(value);
        } else {
            setPrizeNumber(undefined);
            setCurrentPrizeDetails({});
        }
    }

    const openQRCode = () => {
        console.log('Open QR Code');
        setShowQRScreen(true);
    }

    const closeClicked = () => {
        setShowQRScreen(false);
    }

    const onCloseClickedStatus = () => {
        setAlertState({ showAlert: false, alertStatus: 'success', alertText: '' });
    }

    const onSubmitButtonClick = async () => {
        let isPrizeSelected = await checkIfPrizeAlreadySelected();
        if (isPrizeSelected.response) {
            setAlertState({ showAlert: true, alertStatus: 'fail', alertText: `Prize Already Selected for Token Number ${isPrizeSelected.details.Token_Number}`});
            return
        }
        setCurrentPrizeDetails({...currentPrizeDetails, showAlert: true});
    }

    const validateTokenProcessed = async() => {
        if (tokenNumber) {
            let response = await Axios.get('/isTokenAlreadyProcessed',{
              params: { 
                        token_number: tokenNumber 
                    } 
              }
            );
            console.log(response.data);
            if (response.data) {
                console.log('Token Processed Already');
                setDualButtonAlertState({ showAlert: true, alertStatus: 'fail', alertText: `Token Number: ${tokenNumber} is already processed. Do you want to override?` });
            }
                
        }
    }

    const onConfirmed = () => {
        //do nothing
        setDualButtonAlertState({ showAlert: false, alertStatus: 'success', alertText: ' ' });
    }

    const onRejected = () => {
        console.log('On Rejected');
        setTokenNumber(undefined);
        setUserData({});
        setDualButtonAlertState({ showAlert: false, alertStatus: 'success', alertText: ' ' });
    }

    const onQrCodeReadSuccess = (data) => {
        setShowQRScreen(false);
        setPrizeNumber(data.Prize_No);
        setCurrentPrizeDetails({ ...data, showAlert: false });
    }

    const onConfirmationSceenDelivered = async() => {
        let data = JSON.stringify({
            "token_number": tokenNumber,
            "update": {
                "$set": {
                    "Prize_Number": prizeNumber,
                    "Prize_Collected": true,
                    "Prize_Selected": currentPrizeDetails.Prize_Name,
                    "Process_Completed": true
                }
            }
        });

        if (tokenNumber && prizeNumber) {
            let start_time = performance.now();
            let response = await Axios.post("/updatePrizeDetails", data);
            console.log('Time taken to fetch User Name:', performance.now() - start_time);
            console.log(response.data);
            //{"matchedCount": 1, "modifiedCount": 1}
            if (response.data) {
                setAlertState({ showAlert: true, alertStatus: 'success', alertText: 'Data Added Successfully' });
                setTokenNumber(undefined);
                setPrizeNumber(undefined);
                setUserData({});
                setCurrentPrizeDetails({})
            } else {
                setAlertState({ showAlert: true, alertStatus: 'fail', alertText: `Unable to add data, Error: matchedCount ${response.data.matchedCount} modifiedCount ${response.data.modifiedCount}` });
            }
        }
    }

    const onConfirmationSceenNotDelivered = async () => {
        let data = JSON.stringify({
            "token_number": tokenNumber,
            "update": {
                "$set": {
                    "Prize_Number": prizeNumber,
                    "Prize_Collected": false,
                    "Prize_Selected": currentPrizeDetails.Prize_Name,
                    "Process_Completed": false
                }
            }
        });

        if (tokenNumber && prizeNumber) {
            let start_time = performance.now();
            let response = await Axios.post("/updatePrizeDetails", data);
            console.log('Time taken to fetch User Name:', performance.now() - start_time);
            console.log(response.data);
            //{"matchedCount": 1, "modifiedCount": 1}
            if (response.data) {
                setAlertState({ showAlert: true, alertStatus: 'success', alertText: 'Data Added Successfully' });
                setTokenNumber(undefined);
                setPrizeNumber(undefined);
                setUserData({});
                setCurrentPrizeDetails({})
            } else {
                setAlertState({ showAlert: true, alertStatus: 'fail', alertText: `Unable to add data, Error: matchedCount ${response.data.matchedCount} modifiedCount ${response.data.modifiedCount}` });
            }
        }
    }

    const onClosedWithoutConfirming = () => {
        setCurrentPrizeDetails({...currentPrizeDetails, showAlert: false});
    }

    return (
        <>  
            {currentPrizeDetails.showAlert &&
                <ConfirmationScreen 
                    prizeData={currentPrizeDetails} 
                    userData={userData} 
                    onConfirmationSceenConfirmed={onConfirmationSceenDelivered} 
                    onConfirmationSceenRejected={onConfirmationSceenNotDelivered} 
                    onClosedWithoutConfirming={onClosedWithoutConfirming}
                />
            }
            {alertState.showAlert &&
                <Alert onCloseClicked={onCloseClickedStatus} alertState={alertState} />
            }
            {dualButtonAlertState.showAlert &&
                <DualButtonAlert onConfirmed={onConfirmed} onRejected={onRejected} alertState={dualButtonAlertState} />
            }
            {/* {currentPrizeDetails.showAlert &&
                <AlertPrize prizeData={currentPrizeDetails} onCloseClicked={prizeAlertClose} />
            } */}
            {showQRScreen === true ?
                (
                    <>
                        <View style={styles.closeIcon}>
                            <Icon name='close' size={20} color="#000" onPress={closeClicked}></Icon>
                        </View>
                        <ScanScreen readSuccess={onQrCodeReadSuccess}></ScanScreen>
                    </>
                ) :
                (
                    <>
                        <View style={styles.container}>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Text style={styles.heading}>Prize Entry</Text>
                                </Col>
                            </Row>
                            <Row fullHeight>
                                <Col xs={2} sm={2} md={2} lg={2} />
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <Box>
                                        <View style={styles.iconClass}>
                                            <Icon name='ticket' size={20} color="#000" style={styles.leftIcon}></Icon>
                                            <TextInput
                                                style={styles.inputText}
                                                autoCorrect={false}
                                                value={tokenNumber === undefined ? '' : tokenNumber.toString()}
                                                onChangeText={onChangeTokenNumber}
                                                placeholder='Token Number'
                                                keyboardType='decimal-pad'
                                                underlineColorAndroid="transparent"
                                                onBlur={validateTokenProcessed}
                                            />
                                        </View>
                                    </Box>
                                </Col>
                            </Row>
                            <Row fullHeight>
                                <Col xs={2} sm={2} md={2} lg={2} />
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <Box>
                                        <View style={styles.iconClass}>
                                            <Icon name='tree' size={20} color="#000" style={styles.leftIcon}></Icon>
                                            <TextInput
                                                style={styles.inputText}
                                                autoCorrect={false}
                                                value={prizeNumber === undefined ? '' : prizeNumber.toString()}
                                                onChangeText={onChangePrizeNumber}
                                                placeholder='Prize Number'
                                                keyboardType='decimal-pad'
                                                underlineColorAndroid="transparent"
                                            />
                                            <Icon name='camera' size={20} color="#000" style={styles.camera} onPress={openQRCode}></Icon>
                                        </View>
                                    </Box>
                                </Col>
                            </Row>
                            <Row >
                                <Col xs={4} sm={4} md={4} lg={4} />
                                <Col xs={4} sm={4} md={4} lg={4} >
                                    <View style={styles.textInputContainerButton}>
                                        <Button
                                            onPress={onSubmitButtonClick}
                                            title="Submit"
                                            color={DARK_2}
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
                                    <Text style={styles.tokendetailsName}>{userData.Prize_Selected !== currentPrizeDetails.Prize_Name ? currentPrizeDetails.Prize_Name : userData.Prize_Selected}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Token Number:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Token_Number}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Collected By:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Collected_Person}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Hint:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Hint}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Prize Number:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Prize_Number === null ? currentPrizeDetails.Prize_No : userData.Prize_Number}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Prize Name:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Prize_Selected}</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.tokendetails}>Prize Collected:</Text>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <Text style={styles.detailsText}>{userData.Prize_Collected}</Text>
                                </Col>
                            </Row>
                        </View>
                    </>
                )
            }
        </>
    )
}