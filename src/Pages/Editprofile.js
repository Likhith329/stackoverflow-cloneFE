import { Button, TextField } from "@mui/material"
import axios from "axios"
import { Form, Formik, useFormik } from "formik"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export function Editprofile(){
    const {email}=useParams()

    const [user,setUser]=useState([])

    const navigate=useNavigate()
    
    const initialValues={
        firstname:'',
        lastname:'',
        image:''
    }
 
  useEffect(()=>{
    async function getdata(){
      const response=await axios.get('https://stackoverflow-clonebe.onrender.com/users/get')
      let u=response.data.filter(x=>{return x.email==email})
      setUser(u)
      initialValues.firstname=u[0].firstname
      initialValues.lastname=u[0].lastname
      initialValues.image=u[0].image
    }
    getdata()
  },[user])

  const [disp,setDisp]=useState('')

  const styles1={
    display:disp
  }
  const styles2={
    display:disp==''?'none':''
  }


const onSubmit=(values)=>{
    async function editprofile(){
        try {
            setDisp('none')
            await axios.put('https://stackoverflow-clonebe.onrender.com/users/editprofile',{
                firstname:values.firstname,
                lastname:values.lastname,
                image:values.image,
                email:email
            })
            navigate(-1)
        }
         catch (error) {
            setDisp('')
            console.log(error)
        }
    }
    editprofile()
    }

const validate=(values)=>{
    let errors={}
    if(!values.firstname)errors.firstname='Required*'
    if(!values.lastname)errors.lastname='Required*'
    if(!values.image)errors.image='Required*'
 
    return errors;
}

const formik=useFormik({
    initialValues,
    onSubmit,
    validate
})


    return(
        <div className="container-fluid registercont">
            {user?
            <Formik>
            <Form onSubmit={formik.handleSubmit} className='form shadow'  >
                <div className="welcome">Edit Your Profile</div>
                <div className="inpbox">
                <TextField className='textinp' type={'text'} label='Enter First Name' value={formik.values.firstname} name={'firstname'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.firstname && formik.touched.firstname?<div className="error">{formik.errors.firstname}</div>:null}</div>
                </div>
                <div className="inpbox">
                <TextField className='textinp' type={'text'} label='Enter Last Name' value={formik.values.lastname} name={'lastname'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.lastname && formik.touched.lastname?<div className="error">{formik.errors.lastname}</div>:null}</div>
                </div>
                <div className="inpbox">
                <TextField className='textinp' type={'text'} label='Enter Profile url' value={formik.values.image} name={'image'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                    <div >{formik.errors.image && formik.touched.image?<div className="error">{formik.errors.image}</div>:null}</div>
                </div>
            
                <Button variant='contained' type='submit' className="loginbtn be1" style={styles1}>Update</Button>
                <Button variant="contained" className="loginbtn be2" type="button" style={styles2}>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </Button>
            </Form>
            </Formik>:''}
        </div>
    )
}