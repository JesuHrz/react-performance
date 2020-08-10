import React, { useEffect, useCallback } from 'react'

import { useIntersection } from './hooks/useIntersection'
import { useFetchCharacters } from './hooks/useFetchCharacters'

import Characters from './components/Characters'
import SearchInput from './components/SearchInput'

import './App.css'

function App () {
  const [isNear, ref] = useIntersection()
  const [
    loading,
    characters,
    getCharacters
  ] = useFetchCharacters()

  useEffect(() => {
    console.warn('isNear', isNear)
    if (isNear) {
      getCharacters(true)
      return
    }

  }, [isNear, getCharacters])

  const handleChange = useCallback(value => {
    if (value) {
      getCharacters(value) // 1011176 --- 1011334
      return
    }
    getCharacters()
  }, [getCharacters])

  return (
    <div className='App'>
      <SearchInput
        onChange={handleChange}
        placeholder='Buscar personajes'
      />
      <Characters characters={characters} />
      {
        characters.length > 1 && (<div id='visor' ref={ref} />)
      }
      { loading && (<p>Loading...</p>) }
    </div>
  )
}

export default App
