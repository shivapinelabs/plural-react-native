import * as React from 'react';

import { Alert, Button, StyleSheet, View } from 'react-native';
import { generateCreateOrder } from './utils/data1';
import { start } from 'plural-react-native';
const environment = {
  QA: 'QA',
  UAT: 'UAT',
  PROD: 'PROD',
};

export default function App() {
  const onPress = async () => {
    let tokenData = await generateCreateOrder();
    console.log(tokenData.token);

    const options = {
      channelId: 'APP',
      countryCode: '91',
      emailId: 'ashwini.vishwas@pinelabs.com',
      theme: 'Dark',
      orderToken: tokenData.token,
      paymentMode: 'ALL',
      showSavedCardsFeature: false,
      mobileNumber: '9359612449',
    };
    const SDKCallback = ({message, statusCode}): void => {
      if (statusCode == "200") {
        // transcation successful
        console.log("sucessfulll");
        setTimeout(function () {
          successShowAlert(message);
        }, 100);
      } else if (statusCode == "400") {
        // error occurs
        console.log("error occured");
        setTimeout(function () {
          showAlert(message);
        }, 100);
      } else {
        // 300 // trans cancelled
        console.log("cancelled");

        setTimeout(function () {
          showAlert(message);
        }, 100);
      }
    };

    start(options, environment.UAT, SDKCallback);
  };

  function successShowAlert(message: any) {
    console.log('Success', message);
    let messageTemp =
      'Success Reponse: paymentId= ' +
      message.paymentId +
      ' pluralOrderId=' +
      message.pluralOrderId;
    Alert.alert('Alert', messageTemp, [
      { text: 'OK', onPress: () => console.log(messageTemp) },
    ]);
  }

  function showAlert(message: any) {
    Alert.alert('Alert', message, [
      {
        text: 'OK',
        onPress: () =>
          console.log(
            'Callback Reponse: paymentId= ' +
            message.paymentId +
            ' ' +
            'pluralOrderId=' +
            message.pluralOrderId,
          ),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Button title="Pay now" color="#841584" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
