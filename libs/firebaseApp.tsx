// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  onValue,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrrontpMk0pmYvZcNeShFZ7tncdrAJkHE",
  authDomain: "todo-app-730cc.firebaseapp.com",
  projectId: "todo-app-730cc",
  storageBucket: "todo-app-730cc.appspot.com",
  messagingSenderId: "982349457459",
  appId: "1:982349457459:web:bf2753947014ce2ea1db46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export const registerUser = (userObj: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const { email, password, ...user } = userObj;

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const update = {
        uid: userCredential.user.uid,
        ...user,
      };
      // @ts-ignore
      delete update.password;
      return set(ref(db, "users/" + userCredential.user.uid), update).then(
        () => userCredential.user
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        error: true,
        message: errorMessage,
        errorCode: errorCode,
      };
    });
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // To update age and favorite color:
      return update(ref(db, "users/" + userCredential.user.uid), {
        lastLogin: Date.now(),
      }).then(() => userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        error: true,
        message: errorMessage,
        errorCode: errorCode,
      };
    });
};

export const logoutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log("Signout successful");
    })
    .catch((error) => {
      // An error happened.
      console.log("Signout unsuccessful");
    });
};

export const listenToDataChange = (userId: string, handler: Function) => {
  onValue(ref(db, "users/" + userId), (snapshot) => {
    const data = snapshot.val();
    handler(data);
  });
};

export const addTodoItem = (uid: string, data: object) => {
  return set(ref(db, "users/" + uid + "/todos/" + Date.now()), data).then(
    () => data
  );
};

export const updateItem = (uid: string, key: string, data: object) => {
  return update(ref(db, "users/" + uid + "/todos/" + key), data).then(
    () => data
  );
};

export const removeItem = (uid: string, key: string) => {
  return remove(ref(db, "users/" + uid + "/todos/" + key)).then(() => true);
};
