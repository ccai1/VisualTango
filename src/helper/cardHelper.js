import Mapping from './animationMapping'

const validateCard = (card) => {
  // title, direction, height, weighted, unweighted, learning, delay
  if (!card.title || card.title === '') {
    console.log('title is not defined')
    return false
  }
  try {
    parseInt(Mapping[card.direction][card.height][card.weighted][card.unweighted][card.delay])
    if (parseFloat(card.delay) < 0) {
      console.log('delay need to be at least 0')
      return false
    }
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
