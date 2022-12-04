import axios from "axios"
import { useEffect, useState } from "react"

export function Companiespage(){
    const [companies,setCompanies]=useState([])
    useEffect(()=>{
        async function getdata(){
          const response=await axios.get('https://stackoverflow-clonebe.onrender.com/companies/getcompanies')
          setCompanies(response.data)
        }
        getdata()
      },[companies])

    return(
        <div className="container">
            <h2>Companies</h2>
                {companies!=''?
                companies.map((company,index)=>(
                    <div className="compcont" key={index}>
                    <div><img src={company.logo} className='complogo'></img></div>
                    <div className="compinfo">
                        <div className="companytitle"><a href={company.titlelink} target={'_blank'} style={{textDecoration:'none'}}>{company.title}</a></div>
                        <div className="caddress"><span className="loc"><i className="bi bi-geo-alt"></i> {company.loc}</span><span className="building"><i className="bi bi-building"></i></span>{company.building}</div>
                        <div className="compcontent">{company.content}</div>
                    </div>
                    
                    </div>
                )):<div className="spinner-border" style={{width:'3rem',height:'3rem'}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                }
        </div>
    )
}