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

export default function AlertPrize(props) {
  const [state, setState] = useState({});

  const toggleOverlay = () => {
    props.onCloseClicked()
  };

  useEffect(() => {
    console.log('Prize Details', props);
    setState(props.prizeData)
  }, [props]);

  return (
    <View>
      <Overlay isVisible={state.showAlert} onBackdropPress={toggleOverlay}>
        <Text style={styles.textSecondary}>
          {state.Prize_No}
        </Text>
        <Text style={styles.textPrimary}>{state.Prize_Name}</Text>
        {/* <LottieView source={require("./tick_animation.json")} autoPlay loop />; */}
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
      </Overlay>
    </View>
  );
};

// export default function AlertSuccess(props) {
//     const [state, setState] = useState({});
  
//     const toggleOverlay = () => {
//       props.onCloseClicked()
//     };
  
//     useEffect(() => {
//       setState({...props.addedData})
//     }, [props]);
  
//     return (
//       <View>
//         <Overlay isVisible={state.showSuccessAlert} onBackdropPress={toggleOverlay}>
//         {(state.success) === true ?
//            ( <>
//                 <Text style={styles.textPrimary}>Details added Successfully</Text>
//                 <Button
//                 icon={
//                     <Icon
//                     name="check-circle"
//                     type="font-awesome"
//                     color="white"
//                     size={25}
//                     iconStyle={{ marginRight: 10 }}
//                     />
//                 }
//                 title="Ok"
//                 onPress={toggleOverlay}
//                 buttonStyle={styles.buttonStyle}
//                 />
//             </>) :
//             ( <>
//                 <Text style={styles.textPrimary}>Failed to add Details</Text>
//                 <Button
//                 icon={
//                     <Icon
//                     name="times-circle"
//                     type="font-awesome"
//                     color="white"
//                     size={25}
//                     iconStyle={{ marginRight: 10 }}
//                     />
//                 }
//                 title="Ok"
//                 onPress={toggleOverlay}
//                 buttonStyle={styles.buttonStyleFail}
//                 />
//             </>)
//         }
          
//         </Overlay>
//       </View>
//     );
//   };

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
      backgroundColor:DARK_2
  },
  buttonStyle: {
    marginLeft:100,
    marginRight:100,
    backgroundColor:DARK_2
  }
});

