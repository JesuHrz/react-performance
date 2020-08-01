import React, { useState } from 'react'

import './styles.css'

function SearchInput ({ onChange, placeholder }) {
  const [value, setValue] = useState('')

  const handleSubmit = ev => {
    ev.preventDefault()
    onChange(value)
  }

  const handleChange = ({ target }) => {
    if (target.value) {
      setValue(target.value)
      return
    }
    setValue('')
    onChange('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='search'
        type='text'
        onChange={handleChange}
        placeholder={placeholder}
      />
    </form>
  )
}

export default React.memo(SearchInput)
