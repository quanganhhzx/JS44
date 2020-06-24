const controller = {};
controller.register = (registerInfo) =>{
    if(registerInfo.firstName === '') {
        document.getElementById('error-first-name').innerText = 'Please input first name';
    }
    if(registerInfo.firstName === '') {
        document.getElementById('error-last-name').innerText = 'Please input last name';
    }
    if(registerInfo.firstName === '') {
        document.getElementById('error-email-name').innerText = 'Please input email ';
    }
    if(registerInfo.firstName === '') {
        document.getElementById('error-password-name').innerText = 'Please input password';
    }
    if(registerInfo.firstName === '') {
        document.getElementById('error-confirm-password-name').innerText = 'Please input confirmpassword';
    }
    
}
controller.login = (loginInfo) => {
    if(loginInfo.email === ''){
        document.getElementById('error-emails-name').innerText = 'Email incorrect';
    }
    if(loginInfo.password === ''){
        document.getElementById('error-passwords-name').innerText = 'Password incorrect';
    }
    if(loginInfo.email === 'mindx@gmail.com' && loginInfo.password === '123456'){
        alert("Welcome to MindX Chat");

    }
    // if(loginInfo.email !=='' && loginInfo.password !== ''){
    //     view.setActiveScreen('welcomeScreen')
    // }
}