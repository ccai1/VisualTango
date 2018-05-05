import Mapping from './animationMapping'

const validateCard = (card) => {
  // name, direction, height, weighted, unweighted, learning, delay
  if (!name || name === '') {
    console.log('name is not defined')
    return false
  }
  try {
    parseInt(Mapping[card.direction][card.height][card.weighted][card.unweighted][card.delay])
    parseFloat(card.delay)
  } catch (err) {
    console.log(err)
    return false
  }

  return true
}

const matchFrameIndex = (card) => {
  let frame = 0
  try {
    frame = parseInt(Mapping[card.direction][card.height][card.weighted][card.unweighted][card.delay])
  } catch (err) {
    console.log(err)
    return 0
  }
  return frame
}

export {
  validateCard,
  matchFrameIndex
}
