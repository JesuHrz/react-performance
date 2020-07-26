import React, { useState, useEffect, useCallback } from 'react'
import md5 from 'md5'
import styled from 'styled-components'

import { useNear } from './hooks/useNear'

import { Characters } from './components/Characters'

import './App.css'

const PUBLIC_KEY = 'a457653d25fcf3cb534e8f891e9c9165'
const PRIVATE_KEY = 'ef8c6fdb0e133ee1cc59a4c4daa25b328337cd1e'
const LIMIT = 8
const API = 'http://gateway.marvel.com/v1'

const getCharacter = character => {
  const { name, thumbnail, urls } = character
  const imageURL = `${thumbnail.path}/landscape_incredible.${thumbnail.extension}`
  return {
    name,
    imageURL,
    wiki: urls.find(source => source.type === 'wiki')
  }
}

const Application = styled.div`
  padding: 20px 0;
`

const Search = styled.input`
  padding: 2px 5px;
  border: 1px solid black;
  border-radius: 5px;
  width: 261px;
  height: 20px;
`

function App () {
  const [characters, setCharacters] = useState([])
  const [character, setCharacter] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isNear, ref] = useNear()

  const fetchCharacters = (url, type = 'characters') => {
    fetch(url)
      .then(res => res.json())
      .then(({ data }) => {
        const { results } = data

        if (type === 'character') {
          setOffset(0)
          results.map(character => {
            const data = getCharacter(character)
            setCharacters([data])
          })
          return
        }

        setOffset(offset => offset + 8)
        results.map(character => {
          const data = getCharacter(character)
          setCharacters(characters => [...characters, data])
        })
      })
      .catch(console.warn)
  }

  useEffect(() => {
    let ts = new Date().getTime()
    let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)
    if (isNear && !character) {
      const url = `${API}/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${LIMIT}&offset=${offset}`
      fetchCharacters(url)
    }
    if (character) {
      const url = `${API}/public/characters/${character}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
      fetchCharacters(url, 'character')
    }
  }, [isNear, character])

  const handleChange = useCallback(({ target }) => {
    if (target.value) {
      setCharacter(target.value)
      return
    }
    setOffset(0)
    setCharacter('')
    setCharacters([])
  })

  return (
    <Application className='App'>
      <Search
        type='text'
        onChange={handleChange}
        placeholder='Buscar personajes'
      />
      <Characters
        characters={characters}
      />
      <div id='visor' ref={ref} />
    </Application>
  )
}

export default App
