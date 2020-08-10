import md5 from 'md5'

const PUBLIC_KEY = 'a457653d25fcf3cb534e8f891e9c9165'
const PRIVATE_KEY = 'ef8c6fdb0e133ee1cc59a4c4daa25b328337cd1e'

const getCharacter = character => {
  const { id, name, thumbnail, urls } = character
  const imageURL = `${thumbnail.path}/landscape_incredible.${thumbnail.extension}`
  return {
    id,
    name,
    imageURL,
    wiki: urls.find(source => source.type === 'wiki')
  }
}

const generateURLWithHash = () => {
  let ts = new Date().getTime()
  let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)

  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
}

const fetchCharacters = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res.data))
      .catch(e => reject(e))
  })
}

export {
  getCharacter,
  generateURLWithHash,
  fetchCharacters
}
