import React from 'react';
import { Form, Formik, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Registerpage() {

    const navigate=useNavigate()

    const initialValues={
        firstname:'',
        lastname:'',
        imgsrc:'',
        email:'',
        password:'',
        confirmpassword:''
    }

    const onSubmit=(values)=>{
        async function create(){
            try {
                await axios.post('https://stackoverflow-clonebe.onrender.com/users/create',{
                user:{...values}
            })
            navigate('/login')
            } catch (error) {
                console.log(error)
            }
        }
        create()
        }
  
    const validate=(values)=>{
        let errors={}
        if(!values.firstname)errors.firstname='Required*'
        if(!values.lastname)errors.lastname='Required*'
        if(!values.email)errors.email='Required*'
        if(!values.password)errors.password='Required*'
        if(!values.confirmpassword)errors.confirmpassword='Required*'
        if(values.password!=values.confirmpassword)errors.confirmpassword="Password didn't matched!"
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
                <div className="welcome">Sign up</div>
                <div className="inpbox">
                <TextField className='textinp' type={'text'} label='Enter First Name' value={formik.values.firstname} name={'firstname'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.firstname && formik.touched.firstname?<div className="error">{formik.errors.firstname}</div>:null}</div>
                </div>
                <div className="inpbox">
                <TextField className='textinp' type={'text'} label='Enter Last Name' value={formik.values.lastname} name={'lastname'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.lastname && formik.touched.lastname?<div className="error">{formik.errors.lastname}</div>:null}</div>
                </div>
                <div className="inpbox">
                <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                </div>
                <div className="inpbox">
                    <TextField className='textinp' variant="outlined" type={'password'} label={'Enter Password'} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                    <div>{formik.errors.password && formik.touched.password?<div className="error">{formik.errors.password}</div>:null}</div>
                </div>
                <div className="inpbox">
                    <TextField className='textinp' variant="outlined" type={'password'} label={'Confirm Password'} value={formik.values.confirmpassword} name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                    <div>{formik.errors.confirmpassword && formik.touched.confirmpassword?<div className="error">{formik.errors.confirmpassword}</div>:null}</div>
                </div>
                <Button variant='contained' type='submit' className="loginbtn">Sign up</Button>
                <div>Already have an account? <Link to={'/login'}>Login</Link></div>
            </Form>
            </Formik>
        </div>
        </div>
    );
}
