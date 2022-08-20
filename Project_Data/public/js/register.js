const uri = 'http://localhost:3000/register'

const registerUser = async (uri,fields) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(fields)
      }
      const response = await fetch(uri, options)
      const user = await response.json()
      return { error: null, value: user }
    } catch (error) {
      console.log('Error in registerUser', error.message)
      return { error: error.message, value: null }
    }
  }

  const email = document.querySelector('[name = "email"]')
  const password = document.querySelector('[name = "password"]')
  const registerForm = document.querySelector('.register-form')
  
  
  registerForm.addEventListener('submit', async (e) => {
    try {
     e.preventDefault()

     const { error: registerUserError, value: registeredUser } =
        await registerUser(uri, 
            {email: email.value,
             password: password.value})
  
      if (registerUserError) {
        alert ('User already registered')
        email.value=""
        password.value=""
        return
      } else {
        alert('Successfully registered,Please click on Login')
        email.value=""
        password.value=""
          }
  } catch (error) {
      alert('Error while registering')
    }
  })