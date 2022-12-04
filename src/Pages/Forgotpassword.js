import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Form,Formik, useFormik, } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

export function Forgotpassword() {

  const navigate=useNavigate()
   
  const [data,setData]=useState()
  const [disp,setDisp]=useState('')

  const styles1={
    display:disp
  }
  const styles2={
    display:disp==''?'none':''
  }

  useEffect(()=>{
    async function getdata(){
      let response=await axios.get('https://stackoverflow-clonebe.onrender.com/users/get')
      setData(response.data)
    }
    getdata()
  },[])

  const initialValues={
    email:''
  }

  const onSubmit=(values)=>{
    try {
      axios.post('https://stackoverflow-clonebe.onrender.com/forgotpassword',{
      user:{...values}
    })
    setDisp('none')
    } catch (error) {
      console.log(error)
    }
  }

  const validate=(values)=>{
    let errors={} 
    let filtereddata=data.filter(x=>{
      return x.email==values.email
    })
    if(filtereddata=='')errors.email="user doesn't exist"
    if(!values.email)errors.email='required*'
    return errors;
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div>
      <div className="container-fluid registercont" style={styles1}>
        <Formik>
          <Form onSubmit={formik.handleSubmit} className='form'  >
              <div className="welcome">Forgot password</div>
              <div className="inpbox">
              <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
              </div>
              <Button variant='contained' type='submit' className="loginbtn">Submit</Button>
          </Form>
        </Formik>
      </div>
      <h2 className="email-status" style={styles2}> A password-reset link has been sent to your email successfully!</h2>
    </div>
  );
}