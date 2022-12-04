import { Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { Questionspage } from './Questionspage';
import { Profilepage } from './Profilepage';
import { Button } from '@mui/material';
import { Askaquestion } from './Askaquestion';
import { Companiespage } from './Companiespage';
import { Questionpage } from './Questionpage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Editprofile } from './Editprofile';

export function Memberpage() {
  const {email}=useParams()

 

  const [imgsrc,setImgsrc]=useState(undefined)
 
  useEffect(()=>{
    async function getdata(){
      const response=await axios.get('https://stackoverflow-clonebe.onrender.com/users/get')
      setImgsrc(response.data.filter(x=>{return x.email==email})[0].image)
    }
    getdata()
  })

 



  const navigate=useNavigate()

  const [searchedtag,setSearchedtag]=useState('')

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"  height={'40px'}></img>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
              <input className="form-control srchbar srchbar1" type="search" placeholder="Search questions by a tag" aria-label="Search" onChange={(e)=>{
                setSearchedtag(e.target.value)
           }} />
            
              <Link to={'profile'} className='nav-link profile'>
                <Button variant='text'>
                { imgsrc!="" && imgsrc!=undefined ?<img src={imgsrc} className='navpic'></img>:<i className="bi bi-person-circle"></i>}
                  {email}</Button>
              </Link>
              <Button variant="outlined" className="loginbt memberlogoutbtn" onClick={()=>{
                navigate('/')
              }} >Logout</Button>
             
          </div>
        </div>
      </nav>

      <div className='content'>
        <div className='sidebar'>
          <ul className='navbar-nav sidebarlist'>

            <li className='nav-item public ' style={{marginLeft:'15px',fontWeight:'500',fontSize:'15px'}}> PUBLIC </li>

            <li className='nav-item ' style={{width:'100%'}}>
              <Link className='nav-link' to={'questions'}>
              <button className='btn btn-light sblinks'>Questions</button>
              </Link>
            </li>

            <li className='nav-item ' style={{width:'100%'}}>
              <Link className='nav-link' to={'companies'}>
              <button className='btn btn-light sblinks'>Companies</button>
              </Link>
            </li>

          </ul>
        </div>
       
        <Routes >
           <Route path='' element={<Questionspage searchedtag={searchedtag} setSearchedtag={setSearchedtag} />} />
          <Route path='questions' element={<Questionspage searchedtag={searchedtag} setSearchedtag={setSearchedtag} />} />
          <Route path='questions/ask' element={<Askaquestion email={email} />}/>
          <Route path='ask' element={<Askaquestion email={email}/>}/>
          <Route path='questions/:index/ask' element={<Askaquestion email={email} />}/>
          <Route path='questions/:index' element={<Questionpage email={email} />} />
          <Route path=':index' element={<Questionpage email={email} />} />
          <Route path='profile' element={<Profilepage email={email} />} />
          <Route path='profile/editprofile' element={<Editprofile/>}/>
          <Route path='profile/:index' element={<Questionpage email={email}/>} />
          <Route path='companies' element={<Companiespage/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

