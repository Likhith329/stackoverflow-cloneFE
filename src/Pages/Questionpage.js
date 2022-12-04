import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import JoditEditor from 'jodit-react';


export function Questionpage({email}){
    
    const editor=useRef(null)
    const [comment,setComment]=useState('')
    const {index}=useParams()

    const [questions,setQuestions]=useState([])

    const navigate=useNavigate()

   useEffect(()=>{
       async function getdata(){
         const resp=await axios.get('https://stackoverflow-clonebe.onrender.com/questions/get')
         let que=resp.data.reverse()
         setQuestions(que)
        if(que[index]){
            if(que[index].views.includes(email)==false){
                async function voteforquestion(){
                    let newview=que[index].views.filter(x=>{
                        return x!=null
                    })
                    newview.push(email)
                    console.log(newview)
                    try {
                        await axios.put('https://stackoverflow-clonebe.onrender.com/questions/view',{
                        title:que[index].title,
                        view:newview
                    })
                    } catch (error) {
                        console.log(error)
                    }
                }
                voteforquestion()
             }
        }
       }
       getdata()
   },[questions])
    
    const question=questions[index]
 
    return(
        <div className="container-fluid">
          {question?
            <div className="d-flex flex-column">
                <div className="questionheader">
                    <div className="questiontitle">{question.title}</div>
                    <button className="btn btn-outline-primary ask" onClick={()=>{
                    navigate(`ask`)
                    }}>Ask Question</button>
                </div>
                <div className="d-flex" style={{alignItems:"center"}}>
                    <div className="votes">{question.votes.length} votes</div>
                    {question.votes.includes(email)==false?<button className="btn btn-success" style={{marginLeft:'5px'}} onClick={()=>{
                        async function voteforquestion(){
                            let newvote=question.votes
                            newvote.push(email)
                            try {
                                await axios.put('https://stackoverflow-clonebe.onrender.com/questions/vote',{
                                title:question.title,
                                vote:newvote
                            })
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        voteforquestion()
                    }}>Vote</button>:''}
                </div>
                <hr></hr>

                <div className="questionbody">
                    <div className="questioncontent" dangerouslySetInnerHTML={{__html:question.content}}></div>
                    <div className="questionconclusion" dangerouslySetInnerHTML={{__html:question.conclusion}}></div>
                </div>

                <div className="comments">
                    <h4 className="qcomment">Comments</h4>
                    {question.comments.map((x,ind)=>(
                        <div key={ind} className='card shadow comment'>
                            <div className="commentdiv" dangerouslySetInnerHTML={{__html:x.comment}}></div>
                            <div className="emaildiv">by <b>{x.email}</b></div>
                        </div>
                    ))}
                </div>

                <div className="postcomments">
                    <h4 className="addacomment">Add a comment</h4>
                <div>
                <JoditEditor 
                    ref={editor}
                    value={comment}
                    onChange={newcontent=>setComment(newcontent)}
                    />
                    </div>
                    <button className="btn btn-outline-primary postcbtn" onClick={()=>{
                        if(comment!='' && comment!='<p><br></p>'){
                            const newcomment={
                                comment:comment,
                                email:email
                            }
                            async function postcomment(){
                                try {
                                    await axios.put('https://stackoverflow-clonebe.onrender.com/questions/postcomment',{
                                    title:question.title,
                                    comments:[...question.comments,newcomment]
                                })
                                
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            postcomment()
                        }
                        else{
                            alert('Enter all the fields to post!')
                        }
                    }}>Post your comment</button>
                </div>
            </div>
          :<div className="spinner-border" style={{width:'3rem',height:'3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}
        </div>
    )
}