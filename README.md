# plural-react-native
npm package for plural checkout
## Installation

```sh
npm install plural-react-native
```

### For iOS

##### 1) Open podfile from IOS folder and add the following line in your app target:

---

```sh
pod "PluralCheckout", git: "https://github.com/shivapinelabs/plural-ios-sdk.git"
```

##### Sample Podfile:

```sh
target 'PluralCheckoutExample' do
  ...
  pod "PluralCheckout", git: "https://github.com/shivapinelabs/plural-ios-sdk.git"
  ...
end
```

##### 2) Navigate to IOS folder of your project and install pods

---

```sh
cd ios && pod install
```

#### Methods

##### 1) start

---

###### Requires an object as parameter with the following keys:

Return type: Void

#

| Key              | Type     | Required | Description                                     |
| ---------------- | -------- | -------- | ----------------------------------------------- |
| **_options_**    | object   | yes      | Contains order details data.                    |
| **_environment_** | function | yes      | Contains environment details. |
| **_SDKCallback_** | function | yes      | Callback when any type of response is received. |

###### Params for options object in the startPayment and generateHash method

| Key                        | Type    | Required                  | Description                                                                                                                                                           |
| -------------------------- | ------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_channelId_**        | string  | yes                       | It is the channel Id generated at merchant side, for merchant transaction tracking. It is required only for PreAuth and Purchase transactions.                    |
| **_countryCode_**           | number  | yes                       | Country code which is used for mobile numbers                                                                       |                                                |
| **_emailId_**        | string  | yes                       | Email address of customer.                                                                                                                                            |
| **_theme_**     | string  | yes                       | What type of theme you want to keep (Light or Dark)                                                                                                                                            |
| **_paymentMode_**           | string  | yes                       | To select the type of the payment mode the merchant wants to keep for getting the payment like: - All- for all present payment mode CC_DC for only credit and debit type of payment etc..                                                                                            |
| **_orderToken_**            | string  | yes (no for generateHash) | Use SHA256 type of value. |
| **_showSavedCardsFeature_**      | boolean  | yes                       | true for showing the saved card feature false for disabling                                                                                                                                                    |
| **_mobileNumber_**   | string  | yes                       | Mobile number of customer                                                                                                                                               |
| **_cardCategoryType_**          | string  | yes                        | for chossing the type of card which can be used for payment like :- DC for debit card, CC for credit card and CC_DC for debit and credit both                                                                                                |
###### Usage:

```sh
    import { start } from "plural-react-native";

    const options = {
      channelId: 'APP',
      countryCode: '91',
      emailId: 'example@pinelabs.com',
      theme: 'Dark',
      orderToken: token,
      paymentMode: 'ALL',
      showSavedCardsFeature: false,
      mobileNumber: '1234567892',
      cardCategoryType: "DC"
    };

    const environment = {
        QA: 'QA',
        UAT: 'UAT',
        PROD: 'PROD',
    };

    const SDKCallback = () => {
        // handle response here
    }
    start(options, environment.UAT, SDKCallback);

```
