import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Form,Formik, useFormik, } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";


export function Loginpage() {

  const [data,setData]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    async function getdata(){
      const response=await axios.get('https://stackoverflow-clonebe.onrender.com/users/get')
      setData(response.data)
    }
    getdata()
  },[data])

  const initialValues={
    email:'',
    password:''
  }

  const onSubmit=(values)=>{
    async function login(){
      try {
          await axios.post('https://stackoverflow-clonebe.onrender.com/users/login',{
          user:{...values}
      }).then(res=>{
        navigate(`/memberpage/${values.email}`)
        console.log(res.data)})
        .catch(res=>{
        console.log(res.response.data)
        alert('Incorrect password!')
      })
      } catch (error) {
          console.log(error)
      }
     }
     login()
  }

  

  const validate=(values)=>{
    let errors={}
    let filtereddata=data.filter(x=>{
      return x.email==values.email
    })
    if(filtereddata=='')errors.email="User doesn't exist!"
    if(!values.email)errors.email='required*'
    if(!values.password)errors.password='required*'
    return errors;
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div>
      <div className="container-fluid registercont">
        <Formik>
          <Form onSubmit={formik.handleSubmit} className='form shadow'  >
              <div className="welcome">Log in</div>
              <div className="inpbox">
              <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
              </div>
              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'password'} label={'Enter Password'} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.password && formik.touched.password?<div>{formik.errors.password}</div>:null}</div>
              </div>
              <Button variant='contained' type='submit' className="loginbtn">Login</Button>
              <div><Link to={'/forgotpassword'}>forgot password?</Link></div>
              <div>Don't have an account? <Link to={'/register'}>Sign up</Link></div>
           
          </Form>
        </Formik>
      </div>
    </div>
  );
}