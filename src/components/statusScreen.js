import React, { useCallback, useEffect, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/core';
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
        paddingBottom: 20,
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
        padding:5,
        paddingTop:8
    },
    tokendetails: {
        paddingLeft:20,
        fontSize: 22,
        color: DARK_2
    },
    tokendetailsName: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: LIGHT_1
    },
    headingDetails: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 26,
        color: DARK_1,
        padding: 5

    },
    details: {
       fontSize: 22,
       fontWeight: 'bold',
       color: DARK_2,
    }
});



export default function StatusScreen() {
    const [state, setState] = useState({'total': undefined, 'incompleted': undefined, 'delivered': undefined, 'notDelivered': undefined});

    useFocusEffect(
        useCallback(() => {
            console.log('Creating Req to update');
            (async() => {
                let totalTokens = await Axios.get('/getTotalTokens');
                let inCompleteTokens = await Axios.get('/getInCompleteTokens');
                let deliveredTokens = await Axios.get('/prizeDelivered');
                let yetToDeliverTokens = await Axios.get('/prizeYetToDelivered');
                setState({'total': totalTokens.data.count, 'incompleted': inCompleteTokens.data.count, 'delivered': deliveredTokens.data.count, 'notDelivered': yetToDeliverTokens.data.count})
            })();   
        }, [])
    );

    return(
        <>
            <View style={styles.container}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.headingDetails}>Status</Text>
                    </Col>
                </Row>
                <Row fullHeight>
                    {/* <Col xs={12} sm={12} md={12} lg={12}>
                        <Text style={styles.tokendetailsName}>Sujit Simon</Text>
                    </Col> */}
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Overall Token:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.details}>{state.total}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Token Processed:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.details}>{state.total - state.incompleted}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Token Left:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.details}>{state.incompleted}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Prize Delivered:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.details}>{state.delivered}</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.tokendetails}>Prize Yet To Delivered:</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Text style={styles.details}>{state.notDelivered}</Text>
                    </Col>
                </Row>
            </View>
        </>
    )
}