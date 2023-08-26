<script lang="ts">
    import { initializeApp } from "firebase/app";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import {
        getFirestore,
        onSnapshot,
        collection,
        addDoc,
        updateDoc,
        doc,
        getDoc,
        setDoc,
    } from "firebase/firestore";
    import { firebaseConfig } from "$lib/firebase";
    import { storage, db } from "$lib/firebase";
    const app = initializeApp(firebaseConfig);
    const db_ = getFirestore();
    // console.log(app,db);
    let uploading = false;
    let file

    // add data

    // // Add a new document with a generated id.
    //     const docRef = addDoc(collection(db_, "todos"), {
    //      task: "toCode",
    //      isTrue: "false"
    // });

    // const docRef = doc(db_, "todos");
    // async function getdetail()
    // {
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // }
    // getdetail();

    function inputChangeHandler(e) {
        file = e.target.files[0]
    }

    async function upload() {
        uploading = true;
        const docRef = doc(collection(db, "images"))
        // previewURL = URL.createObjectURL(file);
        const storageRef = ref(storage, `/${docRef.id}.png`);
        const result = await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(result.ref);

        await setDoc(docRef, {
            photoURL,
            Comment,
            Date,
            Geolocation
        })
        
        uploading = false;
    }
</script>

<h2 class="card-title">Upload a Profile Photo</h2>

<form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
        <label for="photoURL" class="label">
            <span class="label-text">Pick a file</span>
        </label>
        <input
            on:change={inputChangeHandler}
            name="photoURL"
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            accept="image/png, image/jpeg, image/gif, image/webp"
        />
        {#if uploading}
            <p>Uploading...</p>
            <progress class="progress progress-info w-56 mt-6" />
        {/if}
    </div>
</form>

<button on:click={upload} class="btn btn-primary"> Finish </button>
