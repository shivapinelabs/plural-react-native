import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'plural-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PluralCheckoutPackage = NativeModules.PluralCheckoutPackage  ? NativeModules.PluralCheckoutPackage  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

    type options = {
      channelId: string,
      countryCode: string,
      emailId: string,
      theme: string,
      orderToken: string,
      paymentMode: string,
      showSavedCardsFeature: boolean,
      mobileNumber: string,
    };
    
    
    type SDKCallback = CallableFunction;
    
    export function start(options: options, environment: string, SDKCallback: SDKCallback): Promise<any> {
      return PluralCheckoutPackage.start(options, environment, SDKCallback);
    }    