const NewUsernameDOM = document.getElementById('newusername')
const NewPasswordDOM = document.getElementById('newpassword')
const NewEmailDOM = document.getElementById('newemail')
const UsernameDOM = document.getElementById('username')
const PasswordDOM = document.getElementById('password')

const RegisterUser = async () => {
    const body = {
        Username: NewUsernameDOM.value,
        Password: NewPasswordDOM.value,
        Email: NewEmailDOM.value
    }

    const {data} = await axios.post('/api/register', body, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    })

    console.log(data)

}

const LoginUser = async () => {
    const body = {
        username: UsernameDOM.value,
        password: PasswordDOM.value,
    }
    const {data} = await axios.post('/api/login', body, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
    console.log(data)
}