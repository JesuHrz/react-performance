import md5 from 'md5'

const PUBLIC_KEY = 'a457653d25fcf3cb534e8f891e9c9165'
const PRIVATE_KEY = 'ef8c6fdb0e133ee1cc59a4c4daa25b328337cd1e'

function onIntersection (target, options = {}, cb) {
  if (!target) return
  const observer = new IntersectionObserver(entries => {
    console.warn('entries', entries)
    entries.map(entry => {
      console.warn('entry', entry)
      entry.isIntersecting && cb()
    })
  }, options)

  observer.observe(target)
}

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

export {
  onIntersection,
  getCharacter,
  generateURLWithHash
}
