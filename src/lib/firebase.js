import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot,getDoc  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, readable, derived } from "svelte/store";

export const firebaseConfig = {
    apiKey: "AIzaSyC9FynmjAgnlSOoT2VqYenE49kXEkXTUms",
    authDomain: "rodic-infra.firebaseapp.com",
    projectId: "rodic-infra",
    storageBucket: "rodic-infra.appspot.com",
    messagingSenderId: "845995579793",
    appId: "1:845995579793:web:c430be617953fb5c9ba230",
    measurementId: "G-B0FJTNREC4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();


// /**
//  * @returns a store with the current firebase user
//  */
// function userStore() {
//   let unsubscribe:;

//   if (!auth || !globalThis.window) {
//     console.warn('Auth is not initialized or not in browser');
//     const { subscribe } = writable<User | null>(null);
//     return {
//       subscribe,
//     }
//   }

//   const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
//     unsubscribe = onAuthStateChanged(auth, (user) => {
//       set(user);
//     });

//     return () => unsubscribe();
//   });

//   return {
//     subscribe,
//   };
// }

// export const user = userStore();



// /**
//  * @param  {string} path document path or reference
//  * @param  {any} startWith optional default data
//  * @returns a store with realtime updates on document data
//  */
// export function docStore<T>(
//   path: string,
// ) {
//   let unsubscribe: () => void;

//   const docRef = doc(db, path);

//   const { subscribe } = writable<T | null>(null, (set) => {
//     unsubscribe = onSnapshot(docRef, (snapshot) => {
//       set((snapshot.data() as T) ?? null);
//     });

//     return () => unsubscribe();
//   });

//   return {
//     subscribe,
//     ref: docRef,
//     id: docRef.id,
//   };
// }

// interface UserData {
//   username: string;
//   bio: string;
//   photoURL: string;
//   published: boolean;
//   links: any[];
// }

// export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
//   if ($user) {
//     return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
//   } else {
//     set(null); 
//   }
// });  