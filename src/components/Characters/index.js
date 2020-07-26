import React from 'react'

import { Character } from './character'

function Characters ({ characters }) {
  return (
    <div>
      {
        characters.map(({ name, imageURL, ...rest }, i) => (
          <Character
            key={i}
            name={name}
            image={imageURL}
            {...rest}
          />
        ))
      }
    </div>
  )
}

export {
  Characters
}
