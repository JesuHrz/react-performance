import { useEffect, useState, useCallback } from 'react'

import {
  getCharacter,
  generateURLWithHash,
  fetchCharacters
} from '../lib'

const API = 'http://gateway.marvel.com/v1/public/characters'

function useFetchCharacters (limit = 8, offsetValue = 8) {
  const [characters, setCharacters] = useState([])
  const [offset, setOffset] = useState(false)
  const [character, setCharacter] = useState('')
  const [loading, setLoading] = useState(false)

  // 1011176 --- 1011334

  const getCharacters = useCallback((id = null) => {
    if (id === null && !character) return

    if (typeof id === 'string') {
      setCharacter(id)
      return
    }

    if (!id && character) {
      setCharacter('')
      setCharacters([])
      setOffset(0)
      return
    }

    setOffset(prevOffset => prevOffset + offsetValue)
    
  }, [character, offsetValue])

  useEffect(() => {
    const urlHash = generateURLWithHash()
    const url = `${API}/${character}?${urlHash}`

    if (!character) return

    setLoading(true)
    if (character) {
      fetchCharacters(url)
      .then(({ results }) => {
        const result = results.map(character => getCharacter(character))
        setCharacters(result)
        setLoading(false)
      })
      .catch(() => (setLoading(false)))
    }

  }, [character])

  useEffect(() => {
    const urlHash = generateURLWithHash()
    const url = `${API}?${urlHash}&limit=${limit}&offset=${offset}`

    setLoading(true)
    fetchCharacters(url)
      .then(({ results }) => {
        const data = results.map(character => getCharacter(character))
        setCharacters(characters => [...characters, ...data])
        setLoading(false)
      })
      .catch(() => (setLoading(false)))

  }, [offset, limit, offsetValue])

  return [loading, characters, getCharacters]
}

export {
  useFetchCharacters
}