const download = (filename, obj) => {
  let element = document.createElement('a')
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)))
  element.setAttribute('download', filename + '.json')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export {
  download
}
