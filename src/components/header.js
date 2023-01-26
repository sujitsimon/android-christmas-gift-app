import React from 'react';
import {
    Text
  } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Row, Col } from 'react-native-responsive-grid-system';

const DARK_1 = '#3E0F1B';
const DARK_2 = '#913C48';
const LIGHT_1 = '#D9CECE';
const LIGHT_2 = '#AF7D7E';
const LIGHT_3 = '#C19E9F';


const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        alignContent:'center',
        background: 'rgb(36,2,0)',
        background: 'linear-gradient(90deg, rgba(36,2,0,1) 0%, rgba(121,9,64,1) 35%, rgba(255,85,0,1) 100%)',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: "#fff"
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: DARK_1,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
});

export default function Heading() {

    const getYear = () => {
        let date = new Date();
        return date.getFullYear();
    };

    return (
        <View style={styles.container}>
            <Row fullHeight>
                <Col xs={3} sm={3} md={3} lg={3}>
                    <Image source={require('../images/christmas_tree.png')} style={styles.tinyLogo}/>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                    <Text style={styles.buttonText}>
                        Christmas Gift - {getYear()}
                    </Text>
                </Col>
            </Row>
            {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#c22e48', '#cd3758', '#d74069', '#e04a7a', '#e8558b', '#ef628f', '#f56f94', '#fb7c99', '#fe8f97', '#ffa299', '#fdb4a1', '#fbc5ad']} style={styles.linearGradient}>
            
            </LinearGradient> */}
        </View>
    )
}