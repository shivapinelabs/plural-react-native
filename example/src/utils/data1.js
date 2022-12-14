/* eslint-disable no-bitwise */
//import {merchantSecretKey} from '../config';
import generateSHA from './generateSHA';

const createOrderData = () => {
  const randomString = (length) => {
    var result = '';
    let chars = Date.now().toString() + 'PINELABS';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const data = {
    merchant_data: {
      merchant_id: '12219',
      merchant_access_code: '09a78e68-b3bd-4ddd-b46b-79dab69a271c',
      merchant_return_url: 'http://10.200.146.139:9020/chargingrespnew.aspx',
      merchant_order_id: randomString(15),
    },
    payment_info_data: {
      amount: 200,
      currency_code: 'INR',
      order_desc: 'Test Order',
    },
    customer_data: {
      country_code: '91',
      mobile_number: '8760944447',
      email_id: 'balwant0892@gmail.com',
    },
    billing_address_data: {
      first_name: 'Balwant',
      last_name: 'Singh',
      address1: 'Hisar',
      address2: 'Hisar',
      address3: 'Hisar',
      pin_code: '125005',
      city: 'Hisar',
      state: 'Haryana',
      country: 'India',
    },
    shipping_address_data: {
      first_name: 'Balwant',
      last_name: 'Singh',
      address1: 'Hisar',
      address2: 'Hisar',
      address3: 'Hisar',
      pin_code: '125005',
      city: 'Hisar',
      state: 'Haryana',
      country: 'India',
    },
    product_info_data: {
      product_details: [
        {
          product_code: 2000,
          product_amount: 200,
        },
      ],
    },
    additional_info_data: {
      rfu1: '123',
    },
  };
  return data;
};

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const base64 = {
  btoa: (input = '') => {
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input = '') => {
    let str = input.replace(/[=]+$/, '');
    let output = '';

    if (str.length % 4 === 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  },
};

function GetSHAGenerated(request, secureSecret) {
  let hmac = '';
  try {
    let shaObj = new generateSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(secureSecret, 'HEX');
    shaObj.update(request);
    hmac = shaObj.getHMAC('HEX');
  } catch (err) {
    console.log('Could not generate SHA:' + err);
  }
  return hmac.toUpperCase();
}

export const generateCreateOrderPayload = () => {
  const base64Payload = base64.btoa(JSON.stringify(createOrderData()));
  const sha = GetSHAGenerated(
    base64Payload,
    '61B45EA5F1D947D1949C49D310A2F0D5'
  );
  return { base64Payload, sha };
};

export const processUpiPayload = {
  upi_data: {
    vpa: 'test5@upi',
    upi_option: 'UPI',
  },
  txn_data: {
    payment_mode: 'UPI',
    navigation_mode: 'SEAMLESS',
  },
};

export const generateCreateOrder = async () => {
  const createPayload = generateCreateOrderPayload();
  const data = { request: createPayload.base64Payload };
  const resp = await fetch(
    'https://api-staging.pluralonline.com/api/v1/order/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-verify': createPayload.sha,
      },
      body: JSON.stringify(data),
    }
  );

  const datares = await resp.json();
  console.log('res:', datares);
  return datares;
};
