import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 2px 5px;
  border: 1px solid black;
  border-radius: 5px;
  width: 261px;
  height: 20px;
`

function SearchInput ({ handleChange, placeholder }) {
  return (
    <Input
      type='text'
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

export {
  SearchInput
}
