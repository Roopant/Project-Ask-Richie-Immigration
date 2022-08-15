const questionInput =document.querySelector('.question-input')
const postSubmitButton=document.querySelector('.post-submit-button')
const questions=document.querySelector('.posted-questions-title')


let  Questions=[]

let counter = 0

window.addEventListener('load', () => {
    const SavedQuestions = JSON.parse(localStorage.getItem('Questions'))
    if (Array.isArray(SavedQuestions)) {
      Questions = [...SavedQuestions]
      Questions.forEach(que => {
        postedQuestionTemplate(que.question,que.id,que.reply)
      })
      counter = SavedQuestions.length
    }
  })
 
const SaveQuestions= async (question)=>{
    console.log(question)
    const uri= 'http://localhost:3000/api/v1/forum-questions'
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(question),
    }
    try{
        const response = await fetch(uri,options)
        const data = await response.json()
        console.log('data',data)
        } catch(err) 
        {console.log(err.message)} 
    }

    

const DeleteQueInQuestions=(id)=>{
    const index =Questions.findIndex(que=>que.id===id)
    if (index!==-1) Questions.splice(index,1)
    console.log(Questions)
    SaveQuestions(Questions)
}

const EditQueInQuestions=(id,editedQue) =>{
    const index =Questions.findIndex(que=>que.id===id)
    if (index!==-1) Questions[index].question=editedQue
    console.log(Questions)
    SaveQuestions(Questions)
}

const PostReplyInQuestions=(id, replied)=>{
    const index =Questions.findIndex(que=>que.id===id)
    if (index!==-1) Questions[index].reply=replied
    console.log(Questions)
    SaveQuestions(Questions)
}

const DeleteReplyInQuestions=(id, replied)=>{
    const index =Questions.findIndex(que=>que.id===id)
    if (index!==-1) Questions[index].reply=replied
    console.log(Questions)
    SaveQuestions(Questions)
}

const EditReplyInQuestions=(id,editedReply) =>{
    const index =Questions.findIndex(que=>que.id===id)
    if (index!==-1) Questions[index].reply=editedReply
    console.log(Questions)
    SaveQuestions(Questions)
}

const getID = (isNew)=>{
   if(isNew) return(counter++).toString()
    return (counter).toString()
}
// Don't push it to github if it doesn't work

/*Function-postedQuestionTemplate*/
const postedQuestionTemplate=(questionInputValue,id,reply)=>{
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

postedQuestionText.addEventListener('blur',()=>{
    postedQuestionText.setAttribute('contenteditable',false) 
    EditQueInQuestions(replybuttonid,postedQuestionText.innerHTML)
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
    DeleteQueInQuestions(replybuttonid)
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
    postedReplyTemplate(replybuttonid,replyText.value,questionList);
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

  const postedReplyTemplate=(replybuttonid,reply,questionList)=>{
    if(!reply){return}
    const PostedReply=document.createElement('span')
    const starTag=document.createElement('span')
    starTag.innerHTML='***'
    PostedReply.innerHTML=`${reply}`
    console.log(PostedReply)
    questionList.append(starTag)
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
        DeleteReplyInQuestions(replybuttonid,'')
        starTag.remove();
        PostedReply.remove();
        //postReplybutton.remove();
        DeleteReply.remove();replybutton.remove();EditReply.remove();
        questionList.appendChild(replybutton)})
    
    EditReply.addEventListener('click',()=>{
        PostedReply.focus();
        PostedReply.setAttribute('contenteditable',true)})

      PostedReply.addEventListener('blur',()=>{
        PostedReply.setAttribute('contenteditable',false)
        EditReplyInQuestions(replybuttonid,PostedReply.innerHTML)
       
    } )  
    }   


/*const PostReply=document.createElement('div')
    PostReply.innerHTML=`***${reply}`
    postedQuestions.append(PostReply)*/


const questionList=document.createElement('section')
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


postSubmitButton.addEventListener('click',async ()=>{
    postedQuestionTemplate(questionInput.value,getID())
   await SaveQuestions({question:questionInput.value})
  //console.log(Questions)
    questionInput.value=''
    
})