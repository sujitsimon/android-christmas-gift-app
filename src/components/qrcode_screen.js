'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScanScreen(props) {

    const onSuccess = (e) => {
        console.log('Scanned Data', e.data, typeof(e.data), JSON.parse(e.data.replace(/'/g, '"')));
        //console.log('Scanned Data JSON', JSON.parse(e.data));
        props.readSuccess(JSON.parse(e.data.replace(/'/g, '"')));
      };

    return (
        <>
            <View>
                <QRCodeScanner
                    style={styles.qrcode}
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                />
            </View>
        </>
      );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  closeIcon: {
    flex:1,
    flexDirection:'column-reverse'
  },
  qrcode: {
      flex: 1,

  }
});

// AppRegistry.registerComponent('default', () => ScanScreen);