
const questionInput =document.querySelector('.question-input')
const postSubmitButton=document.querySelector('.post-submit-button')
const questions=document.querySelector('.posted-questions-title')
const loginButton=document.querySelector('#login-btn')
const logoutButton=document.querySelector('#logout-btn')


let  Questions=[]

const uri= 'http://localhost:3000/api/v1/forum-questions'

/*Show & hide error message*/
const errorMsg= document.querySelector('.error-msg-container')
const errorMsgText=document.querySelector('.error-text')

const showErrorMsg = (err) => {
    
   errorMsgText.innerText = err.message || 'Error while doing any operations!'
    errorMsg.style.display = 'block'
    console.error(err.message)
  }

  const hideErrorMsg = () => (errorMsg.style.display = 'none')

/*Show & hide error message*/

const getJWT = () => localStorage.getItem('jwt')



window.addEventListener('load', async () => {
    const options = {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization : getJWT()
          }
    }
    try{
        const response = await fetch(uri,options)
        const data = await response.json()
        console.log('data',data)
        if (Array.isArray(data))  {
            Questions = data
        data.forEach(que => {
          postedQuestionTemplate(que.question,que._id,que.reply,que.createdBy)
        })
        
        const userEmail=localStorage.getItem('userEmail')
        if (userEmail){
        loginButton.textContent= userEmail.split('@')[0]
        loginButton.style.cssText=
        `display:inline;
        text-decoration:none ;
        color:blue;
        pointer-events:none`
        logoutButton.style.display='inline'
      } 
    }
    }catch(err) 
        {//console.error(err.message)
        showErrorMsg(err)} 
    })

 
const SaveQuestions= async (question)=>{
    return new Promise (async(resolve,reject)=>{
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization : getJWT()
          },
        body: JSON.stringify(question),
    }
    try{
        const response = await fetch(uri,options)
        const data = await response.json()
        //console.log('data',data)
        if (data.message==='Please login')
        { throw new Error(data.message)}
        if (data.message==='Validation failed-Please enter minimum 5 characters')
        { throw new Error(data.message)}


        resolve(data)
        hideErrorMsg()
        } catch(err) 
        {//console.error(err.message)
        showErrorMsg(err)
         reject(err)} 
    })
}

const EditQuestion= async (question)=>{
    return new Promise (async(resolve,reject)=>{
     const options = {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization : getJWT()
          },
        body: JSON.stringify(question),
    }
    try{
        const response = await fetch(`${uri}/${question._id}`,options)
        const data = await response.json()
        console.log('data',data)
       if (data.message==='Please login')
          { throw new Error(data.message)}

          if (data.message=== 'you are not authorised to edit or delete Questions and Replies ,posted by other Users') {
            throw new Error(data.message);
        }

          if (data.message==='Validation failed-Please enter minimum 5 characters')
          { throw new Error(data.message)}


        hideErrorMsg()
        resolve(data)
        } catch(err) 
        {//console.error(err.message)
        showErrorMsg(err)
         reject(err)} 
    })}
    

const DeleteQuestion=async (id)=>{
    return new Promise(async(resolve,reject)=>
    {const index =Questions.findIndex(que=>que._id===id) // for this logic to work , we need to push whatever new is created in SaveQuestions function
    if (index!==-1) 
        {const options = {
                method : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : getJWT()
                  },
            }
            try{
                const response = await fetch(`${uri}/${id}`,options)
                const data = await response.json()
                console.log('data',data)
                
                if (data.message==='Please login')
                { throw new Error(data.message)}
                
                if (data.message=== 'you are not authorised to edit or delete Questions and Replies ,posted by other Users') {
                    throw new Error(data.message)}
            
                hideErrorMsg()
                resolve()
                } catch(err) 
                {//console.error(err.message)
                showErrorMsg(err)
                 reject(err)} 
            }
        })
    }


const EditQueInQuestions=(id,editedQue) =>{
    return new Promise(async(resolve,reject)=>
    {const index =Questions.findIndex(que=>que._id===id)
    if (index!==-1)
    try{ Questions[index].question=editedQue
   const data = EditQuestion(Questions[index])
   resolve(data)
}catch (err){
    showErrorMsg(err)
     reject(err)}

})}



const PostReplyInQuestions=(id, replied)=>{
    const index =Questions.findIndex(que=>que._id===id)
    if (index!==-1) Questions[index].reply=replied
    EditQuestion(Questions[index])
    
}

const DeleteReplyInQuestions=(id, replied)=>{
    return new Promise(async(resolve,reject)=>
   {const index =Questions.findIndex(que=>que._id===id)
    if (index!==-1) 
    try {
        Questions[index].reply=replied
        const data= EditQuestion(Questions[index])
          resolve(data)}
    catch (err){
        showErrorMsg(err)
         reject(err)}
   })
}


const EditReplyInQuestions=(id,editedReply) =>{
    return new Promise(async(resolve,reject)=>
   { const index =Questions.findIndex(que=>que._id===id)
    if (index!==-1)
    try {
     Questions[index].reply=editedReply
    const data=EditQuestion(Questions[index])
     resolve(data)}
     catch (err){
        showErrorMsg(err)
         reject(err)}
   })
}

/*const getID = (isNew)=>{
   if(isNew) return(counter++).toString()
    return (counter).toString()
}*/


/*Function-postedQuestionTemplate*/
const postedQuestionTemplate=(questionInputValue,id,reply,createdbyUserEmail)=>{
          if(!questionInputValue){return}

    const questionPostedBy=document.createElement('div')
    questionPostedBy.innerHTML=(createdbyUserEmail)
    questionPostedBy.style.cssText=
    `color:blue;
    font-style:italic`


       const postedQuestionText =document.createElement('p')
    postedQuestionText.innerHTML=`${questionInputValue}`


   const editBtn=document.createElement('button')
   const deleteBtn=document.createElement('button')

   editBtn.innerHTML='Edit'
  editBtn.style.cssText=
`border:2px solid green;
background-color: rgba(0, 255, 0, 0.084);
color:green;
border-radius: 5px;
padding : 0.5rem;
margin-right:1rem;
font-size:1rem;
font-family: 'Roboto',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
cursor:pointer;`

editBtn.addEventListener('click',()=>{
   /* if (!getJWT()) {
        alert('You have to login to continue')
        return}*/
        EditQueInQuestions(replybuttonid,postedQuestionText.innerHTML).then(
            ()=>
           { 
            postedQuestionText.setAttribute('contenteditable',true),
            postedQuestionText.focus(),
            hideErrorMsg()}
).catch(err => showErrorMsg(err),
postedQuestionText.setAttribute('contenteditable',false))
})

postedQuestionText.addEventListener('blur',()=>{
    EditQueInQuestions(replybuttonid,postedQuestionText.innerHTML).then(()=>
    postedQuestionText.setAttribute('contenteditable',false) 
    ).catch(err => showErrorMsg(err),
    postedQuestionText.focus(),
postedQuestionText.setAttribute('contenteditable',true))
})


deleteBtn.innerHTML='Delete'
deleteBtn.style.cssText=
`padding : 0.5rem;
font-size:1rem;
border:2px solid red;
background-color: rgba(255, 0, 0, 0.084);
color:red;
border-radius: 5px;
font-family: 'Roboto',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
cursor:pointer;`

deleteBtn.addEventListener('click',()=>{
    /*if (!getJWT()) {
        alert('You have to login to continue')
        return}*/
    DeleteQuestion(replybuttonid).then(()=> questionList.remove()).catch(err => console.error(err.message))
   })

const postedQuestionsButtons =document.createElement('buttons')
postedQuestionsButtons.appendChild(editBtn)
postedQuestionsButtons.appendChild(deleteBtn)


const postedQuestions=document.createElement('li')
postedQuestions.style.cssText=
`display:flex;
justify-content:flex-start;
gap:20px;
align-items: center;
flex-wrap: wrap;
padding-bottom:1em;`

const replybutton=document.createElement('button')
replybutton.innerHTML='Reply'
replybutton.style.cssText=
`font-family: 'Roboto',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding:0.4em;
    font-weight:700;
    background-color: rgba(158, 95, 95, 0.522);
    border-radius: 10px;
    margin-right:1em;`
    replybutton.setAttribute('id',id)
    const replybuttonid=replybutton.getAttribute('id')
    console.log(replybuttonid)


// Function-replyQuestion
const replyToQuestion=()=>{
 const replyText=document.createElement('input')
 const postReplybutton=document.createElement('button')
 
 postReplybutton.setAttribute('id','postButton')
 postReplybutton.innerHTML='POST'
 postReplybutton.style.cssText=
 `font-family: 'Roboto',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 padding:0.4em;
 font-weight:700;
 background-color: rgba(158, 95, 95, 0.522);
 border-radius: 10px;
 margin: 0em 0.5em`
 

 const cancelReplybutton=document.createElement('button')
   cancelReplybutton.innerHTML='Cancel'
   cancelReplybutton.style.cssText=
   `font-family: 'Roboto',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   padding:0.4em;
   font-weight:700;
   background-color: grey;
   border-radius: 10px;
   margin: 0em 0.5em`
  questionList.append(replyText)
  questionList.append(postReplybutton)
  questionList.append(cancelReplybutton)

  postReplybutton.addEventListener('click',()=>{
    if (!replyText.value) {return}
     PostReplyInQuestions(replybuttonid,replyText.value)
     replyText.remove();postReplybutton.remove();cancelReplybutton.remove();replybutton.remove();
    postedReplyTemplate(replybuttonid,replyText.value,questionList)
    
})

    cancelReplybutton.addEventListener('click',()=>{
        replyText.remove();postReplybutton.remove();cancelReplybutton.remove()
        hideErrorMsg();
    })
    
}
    replybutton.addEventListener('click',()=>{
        if (!getJWT()) {
            alert('You have to login to continue')
            return}
        replyToQuestion()
        hideErrorMsg()
        })

   // postedQuestions.appendChild(questionPostedBy)    
    postedQuestions.appendChild(postedQuestionText)
    postedQuestions.appendChild(postedQuestionsButtons)    

  const postedReplyTemplate=(replybuttonid,reply,questionList)=>{
    if(!reply){return}
    const PostedReply=document.createElement('span')
    PostedReply.innerHTML=`${reply}`
    console.log(PostedReply)
    questionList.append(PostedReply)
  

 const EditReply=document.createElement('button')    
    EditReply.innerHTML='Edit'
    EditReply.style.cssText=
    `cursor:pointer;
    background-color: green;
    color:white; 
    border-color: transparent;
    border-radius: 10px;
     margin: 0.5em;`
    questionList.appendChild(EditReply)
    
    const DeleteReply=document.createElement('button')    
    DeleteReply.innerHTML='Delete'
    DeleteReply.style.cssText=
    `cursor:pointer;
    background-color: red;
    color:white; 
    border-color: transparent;
    border-radius: 10px;
     margin: 0.5em;`
    questionList.appendChild(DeleteReply)

    DeleteReply.addEventListener('click',()=>{
        /*if (!getJWT()) {
            alert('You have to login to continue')
            return}*/

        DeleteReplyInQuestions(replybuttonid,'')
        .then( ()=>{
            PostedReply.remove()
            //postReplybutton.remove();
            DeleteReply.remove()
            replybutton.remove()
            EditReply.remove()
            questionList.appendChild(replybutton)
            hideErrorMsg()}
          ).catch(err => showErrorMsg(err))
        })
    
    EditReply.addEventListener('click',()=>{

      EditReplyInQuestions(replybuttonid,PostedReply.innerHTML).then(
            ()=>
           {  PostedReply.setAttribute('contenteditable',true)
           PostedReply.focus();
           hideErrorMsg()
            }
           ).catch(err => showErrorMsg(err),
        PostedReply.setAttribute('contenteditable',false))
    }
    )

      PostedReply.addEventListener('blur',()=>{
        PostedReply.setAttribute('contenteditable',false)
        EditReplyInQuestions(replybuttonid,PostedReply.innerHTML)
       
    } )  
    }   

    
    
/*const PostReply=document.createElement('div')
    PostReply.innerHTML=`***${reply}`
    postedQuestions.append(PostReply)*/


const questionList=document.createElement('section')
questionList.appendChild(questionPostedBy) 
questionList.appendChild(postedQuestions)
if(!reply) {questionList.appendChild(replybutton)}
else{ postedReplyTemplate(id,reply,questionList)}

questionList.style.cssText=
`border:1px solid grey;
border-radius:5px;
width:50vw;
padding:1em;
margin-bottom:1em
`

questions.appendChild(questionList)
}


postSubmitButton.addEventListener('click',()=>{
    /*if (!getJWT()) {
        alert('You have to login to continue')
        return}*/
    SaveQuestions({question:questionInput.value}).then(que=>{
        //console.log(que)
        postedQuestionTemplate(que.question,que._id,que.reply,que.createdBy)
        Questions.push(que)
        questionInput.value=''
    }).catch(err => showErrorMsg(err))
    
})

questionInput.addEventListener('focus',()=>{
    hideErrorMsg()
})

logoutButton.addEventListener('click', e => {
    e.preventDefault()
    localStorage.clear()
    window.location.href='/html/forum.html'

    /* loginButton.textContent= 'Login'      //This piece of code for safe side 
   loginButton.style.cssText=
   `color:red;
   text-decoration-line:underline;`
    logoutButton.style.display='none'*/

        
})