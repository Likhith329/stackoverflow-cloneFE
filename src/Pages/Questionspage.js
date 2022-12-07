import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Questionspage({searchedtag,setSearchedtag}) {
  const [questions,setQuestions]=useState([])

 useEffect(()=>{
     async function getdata(){
       const resp=await axios.get('https://stackoverflow-clonebe.onrender.com/questions/get')
       setQuestions(resp.data.reverse())
     }
     getdata()
 },[questions])


  const navigate=useNavigate()
  
  
  let tagarrs=questions.map(x=>{
    return x.tags
  })

  let newarr=[],searchedresults=[]

  for(let i=0;i<tagarrs.length;i++){
    for(let j=0;j<tagarrs[i].length;j++){
      if(tagarrs[i][j].toLowerCase().includes(searchedtag.toLowerCase())){
        newarr.push(tagarrs[i][j])
        searchedresults.push(questions[i])
        break;
      }
    }
  }
  
  const count=searchedresults.length
 

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div className="container-fluid questionscont">

      <input className="form-control srchbar srchbar2" type="search" placeholder="Search questions by a tag" aria-label="Search" onChange={(e)=>{
           
                setSearchedtag(e.target.value)
            
           }}/>

      <div className="questionsheader" >
        <h2 className="questionsheadertitle">All Questions</h2>
        <div>
          <button className="btn btn-outline-primary ask" onClick={()=>{
          navigate('ask')
        }}>Ask Question</button>
        </div>
      </div>
      <div>
        <b>{count}</b> questions
      </div>
      <div className="allquestions">
        
        {questions!=''?
        searchedresults.map((question,index)=>(
          <div className="question-summary " key={index}>

            <div className="summary-counts">
              <div className="nvotes">{question.votes.length} votes</div>
              <div className="nanswers">{question.comments.length} comments</div>
              <div className="nviews">{question.views.length} views</div>
            </div>
            <div className="summary-intro">
              <div className="summary-title" onClick={()=>{
                navigate(`${index}`)
              }}>{question.title}</div>
              <div className="summary-content" dangerouslySetInnerHTML={{__html:question.content}}></div>
              <div className="summary-tags">
                <div>
                {question.tags.map((tag,ind)=>(
                  <span key={ind} className="tag">{tag}</span>
                ))}
                </div>
                <div className="summary-footer"><b className="qemail">{question.email}</b></div>
              
              </div>
            </div>
        </div>
        )):<div className="spinner-border" style={{width:'3rem',height:'3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}

      <hr></hr>
      </div>
    </div>
  );
}



