import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Home} from './Pages/Home';
import { Loginpage } from './Pages/Loginpage'
import { Registerpage } from './Pages/Registerpage';
import { Memberpage } from './Pages/Memberpage';
import { Questionspage } from './Pages/Questionspage';
import { Profilepage } from './Pages/Profilepage';
import { Companiespage } from './Pages/Companiespage';

import { Askaquestion } from './Pages/Askaquestion';
import { Questionpage } from './Pages/Questionpage';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Forgotpassword } from './Pages/Forgotpassword';
import { Resetpassword } from './Pages/Resetpassword';
import { Editprofile } from './Pages/Editprofile';
import { Intropage } from './Pages/Intropage';

function App() {
 
  return (
    <div>
      <Routes>

          <Route path='' element={<Home/>} >
            <Route path='' element={<Intropage/>}/>
            <Route path='login' element={<Loginpage/>}/>
            <Route path='register' element={<Registerpage/>}/>
            <Route path='forgotpassword'element={<Forgotpassword/>} />
            <Route path='/resetpassword/:email/:token' element={<Resetpassword/>}/>
          </Route>
        
          <Route path='memberpage/:email/*' element={<Memberpage   />}>
            <Route path='' element={<Questionspage />} />
            <Route path='questions' element={<Questionspage />} />
            <Route path='questions/ask' element={<Askaquestion/>}/>
            <Route path='ask' element={<Askaquestion/>}/>
            <Route path='questions/:index' element={<Questionpage/>} />
            <Route path=':index' element={<Questionpage  />} />
            <Route path='questions/:index/ask' element={<Askaquestion/>}/>
            <Route path='profile' element={<Profilepage/>} />
            <Route path='profile/editprofile' element={<Editprofile/>}/>
            <Route path='profile/:index' element={<Questionpage/>} />
            <Route path='companies' element={<Companiespage/>}/>
          </Route>
          
      </Routes>
    </div>
  );
}

export default App;




