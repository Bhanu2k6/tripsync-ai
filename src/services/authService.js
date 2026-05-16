import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

import { auth } from "./firebase";

const provider =
  new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {

    await signInWithRedirect(
      auth,
      provider
    );

  } catch (error) {

    console.log(error);

  }

};

export const getGoogleRedirectResult = async () => {

  try {

    const result =
      await getRedirectResult(auth);

    if (result?.user) {

      return result.user;

    }

  } catch (error) {

    console.log(error);

  }

};