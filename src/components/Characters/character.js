import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  font-family: bold
`

const Image = styled.img`
  border-radius: 20px;
  -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.48);
  -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.48);
  box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.48);
`

function Character ({ name, image }) {
  return (
    <div className='character-container'>
      <Title>
        {name}
      </Title>
      <Image src={image} />
    </div>
  )
}

export {
  Character
}
