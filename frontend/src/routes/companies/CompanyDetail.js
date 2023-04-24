import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from '../../Api'
import JobCardList from '../jobs/JobCardList'
import Loading from '../../Loading'

const CompanyDetail = () => {
  const { handle } = useParams()

  const [company, setCompany] = useState(null)

  useEffect(() => {
    const getCompany = async () => {
      setCompany(await JoblyApi.getCompany(handle))
    }

    getCompany()
  }, [handle])

  if (!company) return <Loading />

  return (
    <div className='CompanyDetail col-md-8 offset-md-2'>
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  )
}

export default CompanyDetail
