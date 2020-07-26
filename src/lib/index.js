function onIntersection (target, options = {}, cb) {
  if(!target) return

  const observer = new IntersectionObserver(entries => {
    console.warn('entries', entries)
    entries.map(entry => {
      console.warn('entry', entry)
      entry.isIntersecting && cb()
    })
  }, options)

  observer.observe(target);
}

export {
  onIntersection
}