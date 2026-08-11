// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATkgDQO2W7GJ4diWgCRP1EXyCuGmp1Qls',
  authDomain: 'pomodolo-clock-app.firebaseapp.com',
  projectId: 'pomodolo-clock-app',
  storageBucket: 'pomodolo-clock-app.firebasestorage.app',
  messagingSenderId: '627162969676',
  appId: '1:627162969676:web:78bb9180efa4e3e3ec66e9',
  measurementId: 'G-9TQSJ3SE4T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;

// Safely initialize analytics
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((err) => {
    console.warn('Firebase Analytics initialization failed or not supported:', err);
  });

/**
 * Log a custom event to Firebase Analytics safely
 */
export function logAnalyticsEvent(eventName: string, eventParams?: Record<string, any>) {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (err) {
      console.error(`Failed to log analytics event: ${eventName}`, err);
    }
  }
}

export { app, analytics };
