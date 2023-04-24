import React, { useState, useEffect } from 'react'
import SearchForm from '../../forms/SearchForm'
import JoblyApi from '../../Api'
import CompanyCard from './CompanyCard'
import Loading from '../../Loading'

const CompanyList = () => {
  const [companies, setCompanies] = useState(null)

  useEffect(() => {
    search()
  }, [])

  const search = async (name) => {
    const companies = await JoblyApi.getCompanies(name)
    setCompanies(companies)
  }

  if (!companies) return <Loading />

  return (
    <div className='CompanyList col-md-8 offset-md-2'>
      <SearchForm searchFor={search} />
      {companies.length
        ? (
          <div className='CompanyList-list'>
            {companies.map(c => (
              <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            ))}
          </div>
          )
        : (
          <p className='lead'>Sorry, no results were found!</p>
          )}
    </div>
  )
}

export default CompanyList
