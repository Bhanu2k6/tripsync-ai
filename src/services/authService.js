import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {

    const result = await signInWithPopup(auth, provider);

    return result.user;

  } catch (error) {

    console.log(error);
  }
};

export const logoutUser = async () => {
  try {

    await signOut(auth);

  } catch (error) {

    console.log(error);
  }
};