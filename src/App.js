import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { createRenderer } from 'react-dom/test-utils';

firebase.initializeApp({
  apiKey: "AIzaSyDsVF_aS41c-v92hqZ8pklu2gegGLK_Vxg",
  authDomain: "chat-app-af108.firebaseapp.com",
  projectId: "chat-app-af108",
  storageBucket: "chat-app-af108.appspot.com",
  messagingSenderId: "431987442083",
  appId: "1:431987442083:web:86142e79dbd79e0c669a16",
  measurementId: "G-E2SV3H5ZFC"
})

function App() {
  return (
    <div className="App">
      <header>

      </header>
      <selection>
        {user ? <ChatRoom /> : <SignIn/>}
      </selection>
    </div>
  );
}

function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useSignInWithPopup(provider);
  }
  
  return(
    <button onClick={useSignInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collecttion('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setValue] = useState('');
  const dummy = useRef();

  const sendMessage =async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebased.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setformValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  return(
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        <div ref={'dummy'}></div>

      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setformValue(e.target.value)}/>
        <button type='submit'>@</button>
      
      </form>


    </>
  )
}
function ChatMessage(props){
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recived';

  return (
    <div className={'message ${messageClass}'}>
      <image src={photoURL} />
      <p>{text}</p>
    </div>


  )
}


export default App;
