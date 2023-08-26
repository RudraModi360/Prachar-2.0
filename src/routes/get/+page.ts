/** @type {import('./$types').PageLoad} */
import { firebaseConfig } from "$lib/firebase";
import { storage, db } from "$lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function load() {
    let fire_data;
    const q = query(collection(db, "images"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
         fire_data =  doc.data();
    });
    // @ts-ignore
    return {fire_data};
};