const questionInput =document.querySelector('.question-input')
const postSubmitButton=document.querySelector('.post-submit-button')
const questionList=document.querySelector('.posted-questions-title')

console.log(questionInput)
console.log(postSubmitButton)
console.log(questionList)

const postedQuestionTemplate=(questionInputValue)=>{
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
font-size:1rem;`

deleteBtn.innerHTML='Delete'
deleteBtn.style.cssText=
`padding : 0.5rem;
font-size:1rem;
border:2px solid red;
background-color: rgba(255, 0, 0, 0.084);
color:red;
border-radius: 5px;`

const postedQuestionsButtons =document.createElement('buttons')
postedQuestionsButtons.appendChild(editBtn)
postedQuestionsButtons.appendChild(deleteBtn)


const postedQuestions=document.createElement('li')
postedQuestions.style.cssText=
`display:flex;
justify-content:flex-start;
gap:20px;
align-items: center;`

postedQuestions.appendChild(postedQuestionText)
postedQuestions.appendChild(postedQuestionsButtons)

questionList.appendChild(postedQuestions)
}

postSubmitButton.addEventListener('click',()=>{
    postedQuestionTemplate(questionInput.value)
})

