import { useEffect, useState, useRef } from 'react'

function useNear (target, options = { rootMargin: '500px' }) {
  const [isNear, setIsNear] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const elem = target ? target.current : ref.current

    const onIntersection = (entries, observer) => {
      const elem = entries[0]
      if (elem.isIntersecting) {
        setIsNear(true)
      } else {
        setIsNear(false)
      }
    }

    const observer = new IntersectionObserver(onIntersection, options)

    if (elem) {
      observer.observe(elem)
    }

    return () => observer && observer.disconnect()
  })

  return [isNear, ref]
}

export {
  useNear
}
