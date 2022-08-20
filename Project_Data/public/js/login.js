const uri = 'http://localhost:3000/login'

const loginUser = async (uri, fields) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(fields)
      }
      const response = await fetch(uri, options)
  
      if (response.status !== 200) {
        const error = await response.json()
        return { error: error.message, value: null }
      } else {
        const { token } = await response.json()
        return { error: null, value: token }
      }
    } catch (error) {
      console.log('Error in loginUser', error.message)
      return { error: error.message, value: null }
    }
  }
    
  const email = document.querySelector('[name = "email"]')
  const password = document.querySelector('[name = "password"]')
  const loginForm = document.querySelector('.login-form')
  
  
  loginForm.addEventListener('submit', async e => {
    try {
      e.preventDefault()
      const { error: loginUserError, value: token } = await loginUser(uri,
        {
          email: email.value,
          password: password.value
        }
      )
      if (loginUserError) {
        alert('Incorrect Email or Password')
        return
      }

      if (token) {
        alert('You have successfully logged in, Redirecting to Forum page')
        localStorage.setItem('jwt', token)
        localStorage.setItem('userEmail', email.value)
        window.location.href ='/html/forum.html' // BUG we need to redirect with headers authorization set to token
      }
    } catch (error) {
      console.error('Error in user log in', error)
      alert('Error while logging')
    }
  })