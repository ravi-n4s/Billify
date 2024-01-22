export const config = {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  },
  company: {
    name: process.env.REACT_APP_COMPANY_NAME,
    address: process.env.REACT_APP_COMPANY_ADDRESS,
    contact: process.env.REACT_APP_COMPANY_CONTACT,
  },
  signature: process.env.REACT_APP_SIGNATURE,
  thankyouNote: process.env.REACT_APP_THANKYOU_NOTE,
  brand: process.env.REACT_APP_BRAND_NAME,
};
