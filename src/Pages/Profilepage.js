import { Button } from "@mui/material"
import { style } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function Profilepage({email}) {
  
  const navigate=useNavigate()

  const [users,setUsers]=useState([])
 
  useEffect(()=>{
    async function getdata(){
      const response=await axios.get('https://stackoverflow-clonebe.onrender.com/users/get')
      setUsers(response.data)
    }
    getdata()
  },[users])

  const [questions,setQuestions]=useState([])
  
  useEffect(()=>{
      async function getdata(){
        const resp=await axios.get('https://stackoverflow-clonebe.onrender.com/questions/get')
        setQuestions(resp.data.reverse())
      }
      getdata()
  },[questions])

  return (
    <div>
    {users!=''?
    <div>
      {users.filter(x=>{
        return x.email==email
      }).map((x,index)=>(
        <div key={index} className='container'>

          <div className="profileheader">
          {x.image!='' && x.image!=undefined?<img src={x.image} className='pic'></img>:
          <div>
            <i className="bi bi-person-circle profilepic"></i>
          <form><input type={'text'}className='form-control' placeholder='Enter profile url' onKeyUp={(e)=>{
            if(e.key=='Enter'){
               function updatepic(){
                 axios.put('https://stackoverflow-clonebe.onrender.com/users/picupdate',{
                  email:email,
                  image:e.target.value
                })
              }
              updatepic()
            }
           }}></input></form>
            </div>}
          <div className="name">
            <div>
            <span className="firstname">{x.firstname}</span><span className="lastname">{x.lastname}</span>
            </div>
            <div className="pemail">{x.email}</div>
          </div>
          <Button onClick={()=>{navigate(`editprofile`)}}><i className="bi bi-pencil" style={{marginRight:'10px'}}></i> Edit profile</Button>
          </div>

          <div className="yourques">
            <h4 className="yourquetitle">Your Questions</h4>
          {questions!=''?
          questions.filter(x=>{
            return x.email==email
          }).map((question,index)=>(
          <Questions key={index} question={question}/>
        )):<div className="spinner-border" style={{width:'3rem',height:'3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}

          </div>
          
        </div>
      ))
      }
    </div>:<div className="spinner-border" style={{width:'3rem',height:'3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
    </div>
  );
}

function Comments({comment,email}){
  
  return(
      <div className='card shadow comment'>
          <div className="commentdiv" dangerouslySetInnerHTML={{__html:comment}}></div>
          <div className="emaildiv">by <b>{email}</b></div>
      </div>
  )
}

function Questions({question}){
  const [disp,setDisp]=useState('none')

  const styles1={
    display:disp
  }
  
  return(
    <div className="question-summary ps">

            <div className="summary-counts psc">
              <div className="nvotes">{question.votes.length} votes</div>
              <div className="nanswers">{question.comments.length} comments</div>
              <div className="nviews">{question.views.length} views</div>
            </div>
            <div className="summary-intro psi">
              <div className="summary-title pst">{question.title}</div>
              <div className="summary-content psc" dangerouslySetInnerHTML={{__html:question.content}}></div>
              <div className="summary-tags pst">
                <div>
                {question.tags.map((tag,ind)=>(
                  <span key={ind} className="tag">{tag}</span>
                ))}
                </div>

                <div className="profilecomments">
                <Button  className='btn btn-outline-info commentbtn' onClick={()=>{setDisp(disp==''?'none':'')}}>Comments</Button>
                <div  style={styles1} >
                {question.comments.map((x,ind)=>(
                        <Comments key={ind} comment={x.comment} email={x.email} />
                    ))}
                </div>
                </div>

              </div>
            </div>
        </div>
  )
}
