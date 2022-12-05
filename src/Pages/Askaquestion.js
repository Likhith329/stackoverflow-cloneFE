import axios from "axios";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Askaquestion({email}) {
    const navigate=useNavigate()

    const editor1=useRef(null)
    const editor2=useRef(null)
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [conclusion,setConclusion]=useState('')
    const [tags,setTags]=useState(['Javascript','React'])
    

    const post={
        title,
        content,
        conclusion,
        tags,
        email:email,
        comments:[],
        votes:[],
        views:[]
    }
  

    function addtag(tag){
        if(tags.includes(tag)==false){
            setTags([...tags,tag])
        }
    }
    function removetag(index){
       tags.splice(index,1)
       setTags([...tags])
    }

    return (
      <div className="headers">

        <div className="header1">
            <div className="stitle">
                Ask a public question
            </div>
            <div className="titledesc">
                <h3 className="des1">Writing a good question</h3>
                <h5 className="des2">Steps</h5>
                <ul className="des3">
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Describe what you tried and what you expected to happen.</li>
                    <li>Add “tags” which help surface your question to members of the community.</li>
                </ul>
                
            </div>
        </div>

        <div className="header2">
            <div className="title">
                <h4 className="h4title">Title</h4>
                <div className="h4titledes">Be specific and imagine you’re asking a question to another person.</div>
                <input type={'text'} className='form-control' placeholder="e.g. Is there a R function for finding the index of an element in a vector?" onChange={e=>setTitle(e.target.value)}></input>
            </div>        
        </div>

        <div className="header3">
            <h4 className="h4title">What are the details of your problem?</h4>
            <div className="h4titledes">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
            <JoditEditor 
            ref={editor1}
            value={content}
        
            onChange={newcontent=>setContent(newcontent)}
            />
        </div>
         
         <div className="header4">
            <h4 className="h4title">What did you try and what were you expecting?</h4>
            <div className="h4titledes">Describe what you tried, what you expected to happen, and what actually resulted.</div>
            <JoditEditor 
            ref={editor2}
            value={conclusion}
            onChange={newcontent=>setConclusion(newcontent)}
            />
         </div>

         <div className="header5">
            <h4 className="h4title">Tags</h4>
            <div className="h4titledes">Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
            <div className="d-flex" style={{flexWrap:'wrap'}}>
                {tags.map((x,index)=>(
                <span key={index} className="tag">{x} <i className="bi bi-x" onClick={()=>{     
                    removetag(index)         
                }}></i></span>
            ))}
            </div>
           <input className="form-control" type={'text'} placeholder='Enter a tag' onKeyUp={(e)=>{
            if(e.key=='Enter'){
                addtag(e.target.value)
                e.target.value=''
            }
           }}></input>
           
         </div>
         <div >
         <button className="btn btn-outline-primary postbtn" onClick={()=>{
            if(title!='' && (content!='' && content!='<p><br></p>') && (conclusion!='' && conclusion!='<p><br></p>') && tags!=''){
                async function postquestion(){
                    try {
                        await axios.post('https://stackoverflow-clonebe.onrender.com/questions/ask',{
                        question:{...post}
                    })
                    navigate(-1)
                    } catch (error) {
                        console.log(error)
                    }
                }
                postquestion()
            }
            else{
                alert('Enter all the fields to post!')
            }
         }}>Post</button>
         </div>
      </div>
    );
  }
  