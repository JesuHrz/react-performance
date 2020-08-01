import React, { useState, useEffect, useCallback, useRef } from 'react'

import { useIntersection } from './hooks/useIntersection'

import Characters from './components/Characters'
import SearchInput from './components/SearchInput'

import { getCharacter, generateURLWithHash, fetchCharacters } from './lib'

import './App.css'

const LIMIT = 8
const API = 'http://gateway.marvel.com/v1'

function App () {
  const [characters, setCharacters] = useState([])
  const [offset, setOffset] = useState(0)
  const [character, setCharacter] = useState('')
  const [isNear, ref] = useIntersection()
  const isLoading = useRef(false)

  const getCharacters = useCallback(() => {
    const urlHash = generateURLWithHash()
    const url = `${API}/public/characters?${urlHash}&limit=${LIMIT}&offset=${offset}`
    isLoading.current = true

    fetchCharacters(url)
      .then(({ results }) => {
        setOffset(offset => offset + 8)
        const data = results.map(character => getCharacter(character))
        setCharacters(characters => [...characters, ...data])
        isLoading.current = false
      })
      .catch(() => (isLoading.current = false))
  }, [offset])

  const getCharacterById = useCallback(character => {
    const urlHash = generateURLWithHash()
    const url = `${API}/public/characters/${character}?${urlHash}`
    isLoading.current = true
    fetchCharacters(url)
      .then(({ results }) => {
        setOffset(0)
        const result = results.map(character => getCharacter(character))
        setCharacters(result)
        isLoading.current = false
      })
      .catch(() => (isLoading.current = false))
  }, [])

  useEffect(() => {
    if (isNear && !character && !isLoading.current) {
      getCharacters()
    }

    if (character && !isLoading.current) {
      getCharacterById(character)
    }
  }, [isNear, character, getCharacters, getCharacterById, offset])

  const handleChange = useCallback((value) => {
    if (value) {
      setCharacter(value) // 1011176 --- 1011334
      return
    }
    if (!offset) { setCharacters([]) }

    setCharacter('')
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
        !(characters.length === 1) && (<div id='visor' ref={ref} />)
      }
    </div>
  )
}

export default App
