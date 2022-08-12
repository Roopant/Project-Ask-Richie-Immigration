const mongoose= require('mongoose')

module.exports=()=>{
    const{DB_USERNAME:dbUserName , DB_PASSWORD:dbPassword,DB_NAME :dbName}=process.env


    const uri=`mongodb+srv://${dbUserName}:${dbPassword}@cluster0.ainzm.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(uri,
    /*{                             These lines are right now optional ,we might need in future to parse 
    useNewUrlParser:true,               proper connection between local application and MongoDB
    useUnifiedTopology:true}*/)
.catch(error=>console.error(error))

mongoose.connection.once('open',()=>
{ console.log('Mongoose is Connected')})
}