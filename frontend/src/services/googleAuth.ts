import { gapi } from 'gapi-script';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export const initializeGoogleAuth = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    gapi.load('auth2', {
      callback: () => {
        gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
        }).then(() => {
          console.log('Google Auth initialized');
          resolve();
        }).catch((error: any) => {
          console.error('Error initializing Google Auth:', error);
          reject(error);
        });
      },
      onerror: () => {
        console.error('Error loading Google Auth');
        reject(new Error('Failed to load Google Auth'));
      },
    });
  });
};

export const signInWithGoogle = async (): Promise<string> => {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    const googleUser = await authInstance.signIn();
    const idToken = googleUser.getAuthResponse().id_token;
    return idToken;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw new Error('Google sign-in failed');
  }
};

export const signOutGoogle = async (): Promise<void> => {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    await authInstance.signOut();
  } catch (error) {
    console.error('Google sign-out error:', error);
  }
};