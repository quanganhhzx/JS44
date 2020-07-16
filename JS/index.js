window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyA3DTU4hydEexX86nSVNl7Kemt8jX3ObYg",
    authDomain: "chat-js44.firebaseapp.com",
    databaseURL: "https://chat-js44.firebaseio.com",
    projectId: "chat-js44",
    storageBucket: "chat-js44.appspot.com",
    messagingSenderId: "274964083599",
    appId: "1:274964083599:web:e6ad6c520eb12ded9951fa"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        // model.currentUser = user
        model.currentUser = {
          displayName: user.displayName,
          email: user.email
        }
        view.setActiveScreen('chatScreen')
      } else {
        view.setActiveScreen('loginScreen')
      }
    } else {
      view.setActiveScreen('loginScreen')
    }
  });
  console.log(firebase.app().name)
  console.log('loaded!')
}

templateQueryDatabase = () => {
  const docId = 'oTVtYS2O9Ixhj5rVUHna'
  // get one
  firebase.firestore().collection('users').doc(docId).get().then(res => {
    console.log(getDataFromDoc(res))
  }).catch(err => {
    console.log(err)
  })
  // get many
  firebase.firestore().collection('users').where('age', '==', 20).get().then(res => {
    console.log(res)
    // console.log(getDataFromDoc(res.docs[0]))
    console.log(getDataFromDocs(res.docs));
    
  })
  // create
  const dataToCreate = {
    name: 'Create',
    age: 18,
    email: 'quanganh@gmail.com',
    phoneNumber: ['01233434343']
  }
  // update
  const docIdUpdate = 'B56BnDlsvdMoQvq5Z71I'
  const dataToUpdate = {
    age: 21,
    address: 'HN',
    phone: firebase.firestore.FieldValue.arrayUnion('090909094')
  }

  firebase.firestore().collection('users').doc(docIdUpdate).update(dataToUpdate).then(res => {
    // alert('updated!')
  })
  // delete
  const docIdDelete = 'DzvsrYM8CJQvuOgtY4El'
  firebase.firestore().collection('users').doc(docIdDelete).delete().then(res => {
    alert('deleted!')
  })
}

