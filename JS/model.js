const model = {}
model.currentUser = undefined
model.collectionName = 'conversations'
model.currentConversation = undefined
model.conversations = undefined

model.register = (firstName, lastname, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + ' ' + lastname
        })
        alert('Register success, please check your email!')
        view.setActiveScreen('loginScreen')
    }).catch((e) => {
        alert(e.message)
        console.log(e)
    })
}

model.login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user)
            if (user.user.emailVerified) {
                model.currentUser = {
                    displayName: user.user.displayName,
                    email: user.user.email
                }
                console.log(model.currentUser)
                view.setActiveScreen('chatScreen')
            } else {
                alert('Vefify your email!')
            }
        }).catch((e) => {
            alert(e.message)
        })
}

model.loadConversations = () => {
    firebase.firestore().collection(model.collectionName)
        .where('users', 'array-contains', model.currentUser.email)
        .get()
        .then(res => {
            const data = utils.getDataFromDocs(res.docs)
            model.conversations = data
            if (data.length > 0) {
                model.currentConversation = data[0]
                view.showCurrentConversation()
            }
            view.showConversation()
        })
}


model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message),
    }
    firebase.firestore()
        .collection('conversations')
        .doc(model.currentConversation.id)
        .update(dataToUpdate)
}

model.listenConversationChange = () => {
    let isFirstRun = false
    firebase.firestore().collection(model.collectionName)
        .where('users', 'array-contains', model.currentUser.email)
        .onSnapshot((res) => {
            if (!isFirstRun) {
                isFirstRun = true
                return
            }
            const docChanges = res.docChanges()
            for (oneChange of docChanges) {
                const type = oneChange.type
                console.log(type)
                const oneChangeData = utils.getDataFromDoc(oneChange.doc)
                console.log(oneChangeData);
                if (type === 'modified') {
                    if (oneChangeData.id === model.currentConversation.id) {
                        //neu nhu la them tin nhan moi
                        if(oneChangeData.users.length === model.currentConversation.users.length){
                            view.addMessage(oneChangeData.messages[oneChangeData.messages.length - 1])

                        }else{
                            //them user moi
                            view.showUser(oneChangeData.users[oneChangeData.users.length - 1])
                        }
                        model.currentConversation = oneChangeData

                    }

                    for (let i = 0; i < model.conversations.length; i++) {
                        const element = model.conversations[i]
                        if (element.id === oneChangeData.id) {
                            model.conversations[i] = oneChangeData
                            if(oneChangeData.messages[oneChangeData.messages.length - 1].owner !== model.currentUser.email){
                            view.showNotify(oneChangeData.id)

                            }
                        }
                    }
                }

                else if (type === 'added') {
                    model.conversations.push(oneChangeData)
                    view.addConversation(oneChangeData)
                    view.showNotify(oneChangeData.id)

                }
            }
        })
}

model.changeCurrentConversation = (conversationId) => {
 model.currentConversation = model.conversations
        .filter(item => item.id === conversationId)[0]
    console.log(model.currentConversation)
    view.showCurrentConversation()
}

model.createConversation = (conversation) => {
    firebase.firestore().collection(model.collectionName).add(conversation)
    view.backToChatScreen()
}
model.addUser = (email) =>{
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(email)
    }
    firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate)
}