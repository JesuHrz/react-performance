import { useState } from 'react'
import md5 from 'md5'

const PUBLIC_KEY = 'a457653d25fcf3cb534e8f891e9c9165'
const PRIVATE_KEY = 'ef8c6fdb0e133ee1cc59a4c4daa25b328337cd1e'
const API = 'http://gateway.marvel.com/v1'

const getCharacter = character => {
  const { name, thumbnail } = character
  const imageURL = `${thumbnail.path}/landscape_incredible.${thumbnail.extension}`
  return {
    name,
    imageURL
  }
}

function useFetchCharacters (limit = 8, offset = 8, ) {
  const [characters, setCharacters] = useState([])
  const [offsetCurrent, setOffsetCurrent] = useState(0)

  let ts = new Date().getTime()
  let hash = md5(ts+PRIVATE_KEY+PUBLIC_KEY)
  let url = `${API}/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offsetCurrent}`

  const loadCharacters = () => {
    fetch(url)
    .then(res => res.json())
    .then(({ data}) => {
      const { results } = data
      setOffsetCurrent(prevOffset => prevOffset + offset)
      results.map(character => {
        const data = getCharacter(character)
        setCharacters(characters => [...characters, data])
      })
    })
  }


  return [characters, loadCharacters]
}

export {
  useFetchCharacters
}