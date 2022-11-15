const NewUsernameDOM = document.getElementById('newusername')
const NewPasswordDOM = document.getElementById('newpassword')
const NewEmailDOM = document.getElementById('newemail')
const UsernameDOM = document.getElementById('username')
const PasswordDOM = document.getElementById('password')

  /****************/
 /*******GUI******/
/****************/

const ShowRegisterForm = () => {
    const registerform = document.querySelector('.registerform')
    const logincontainer = document.querySelector('.container')
    registerform.classList.replace('hiddenclass', 'showclass')
    logincontainer.classList.add('hiddenclass')
}

const HideRegisterForm = () => {
    const registerform = document.querySelector('.registerform')
    const logincontainer = document.querySelector('.container')
    registerform.classList.replace('showclass', 'hiddenclass')
    logincontainer.classList.replace('hiddenclass', 'container')
    NewEmailDOM.value = ''
    NewPasswordDOM.value = ''
    NewUsernameDOM.value = ''
}

  /****************/
 /****FINALGUI****/
/****************/


/* EVENTOS CRUD */ 
const RegisterUser = async () => {
    const body = {
        Username: NewUsernameDOM.value,
        Password: NewPasswordDOM.value,
        Email: NewEmailDOM.value
    }

    if(!body.Username || !body.Email || !body.Password) throw new Error("Debes introducir tus credenciales para continuar...")

    await axios.post('/api/register', body, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
}

const LoginUser = async () => {
    const body = {
        username: UsernameDOM.value,
        password: PasswordDOM.value,
    }

    if(!body.username || !body.password) throw new Error("Debes introducir tus credenciales para continuar...")

    await axios.post('/api/login', body, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
}

/* MAIN */
const LoginMain = () => {
    const loginbutton = document.getElementById('loginbutton')
    const registerbutton = document.getElementById('registerbutton')
    loginbutton.addEventListener('click', async () => {
        try {            
            await LoginUser()
        } catch (error) {
            alert(error.message)
        }
    })
    registerbutton.addEventListener('click', async () => {
        try {
            await RegisterUser()
        } catch (error) {
            alert(error.message)
        }
    })
}

LoginMain()