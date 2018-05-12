import Mapping from './animationMapping'

const validateCard = (card) => {
  // title, direction, height, weighted, unweighted, leaning, delay
  if (!card.title || card.title === '') {
    console.log('title is not defined')
    return false
  }
  try {
    parseInt(Mapping[card.direction][card.height][card.weighted][card.unweighted][card.leaning])
    if (parseFloat(card.delay) >= 0) {
      return true
    }
  } catch (err) {
    console.log(err)
    return false
  }

  return false
}

const matchFrameIndex = (card) => {
  let frame = 0
  try {
    frame = parseInt(Mapping[card.direction][card.height][card.weighted][card.unweighted][card.leaning])
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
