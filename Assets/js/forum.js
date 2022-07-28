const questionInput =document.querySelector('.question-input')
const postSubmitButton=document.querySelector('.post-submit-button')
const questions=document.querySelector('.posted-questions-title')


/*Function-postedQuestionTemplate*/
const postedQuestionTemplate=(questionInputValue)=>{
          if(!questionInputValue){return}

       const postedQuestionText =document.createElement('p')
    postedQuestionText.innerHTML=`&#183 ${questionInputValue}`


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
    postedQuestionText.focus()
    postedQuestionText.setAttribute('contenteditable',true)
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
    questionList.remove()
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

// Function-replyQuestion
const replyToQuestion=()=>{
 const replyText=document.createElement('input')
 const postReplybutton=document.createElement('button')
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
    replyText.remove();postReplybutton.remove();cancelReplybutton.remove();replybutton.remove();
    const PostedReply=document.createElement('span')
    PostedReply.innerHTML=`***${replyText.value}`
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
        PostedReply.remove();postReplybutton.remove();DeleteReply.remove();replybutton.remove();EditReply.remove();
        questionList.appendChild(replybutton)})
    
    EditReply.addEventListener('click',()=>{
        PostedReply.focus();
        PostedReply.setAttribute('contenteditable',true)
        
    } )  
})    

cancelReplybutton.addEventListener('click',()=>{
    replyText.remove();postReplybutton.remove();cancelReplybutton.remove();
})

}


replybutton.addEventListener('click',()=>{
    replyToQuestion()
    })

postedQuestions.appendChild(postedQuestionText)
postedQuestions.appendChild(postedQuestionsButtons)

const questionList=document.createElement('section')
questionList.appendChild(postedQuestions)
questionList.appendChild(replybutton)
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
    postedQuestionTemplate(questionInput.value)
    questionInput.value=''
})

