import React, { useState, useEffect, useCallback } from 'react'

import { useNear } from './hooks/useNear'

import Characters from './components/Characters'
import SearchInput from './components/SearchInput'

import { getCharacter, generateURLWithHash } from './lib'

import './App.css'

const LIMIT = 8
const API = 'http://gateway.marvel.com/v1'

function App () {
  const [characters, setCharacters] = useState([])
  const [offset, setOffset] = useState(0)
  const [character, loadCharacter] = useState('')
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
        const characters = results.map(character => {
          return getCharacter(character)
        })
        setCharacters(characters)
      })
      .catch(console.warn)
  }

  useEffect(() => {
    const urlHash = generateURLWithHash()
    const url = `${API}/public/characters?${urlHash}&limit=${LIMIT}&offset=${offset}`
    fetchCharacters(url)
  }, [])

  useEffect(() => {
    const urlHash = generateURLWithHash()

    if (isNear && !character) {
      const url = `${API}/public/characters?${urlHash}&limit=${LIMIT}&offset=${offset}`
      fetchCharacters(url)
    }

    if (character) {
      const url = `${API}/public/characters/${character}?${urlHash}`
      fetchCharacters(url, 'character')
    }
  }, [isNear, character])

  const handleChange = useCallback((value) => {
    if (value) {
      loadCharacter(value)
      return
    }
    loadCharacter('')
    // 1011334
  }, [])

  return (
    <div className='App'>
      <SearchInput
        onChange={handleChange}
        placeholder='Buscar personajes'
      />
      <Characters
        characters={characters}
      />
      {
        !character && (<div id='visor' ref={ref} />)
      }
    </div>
  )
}

export default App
