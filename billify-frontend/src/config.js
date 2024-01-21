export const config = {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  },
  companyName: process.env.REACT_APP_COMPANY_NAME,
  companyAddress: process.env.REACT_APP_COMPANY_ADDRESS,
  companyContact: process.env.REACT_APP_COMPANY_CONTACT,
  brand: process.env.REACT_APP_BRAND_NAME,
};
