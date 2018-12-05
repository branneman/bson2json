var bsonInputElement = document.querySelector('#bson_input')
var bsonHexInputElement = document.querySelector('#bson_hexinput')
var errorOutputElement = document.querySelector('.error')
var bsonOutputElement = document.querySelector('#bson_output')
var bsonOutputWrapperElement = document.querySelector('.layout__feature--bson')
var deserializeElement = document.querySelector('#deserialize')
var deserializeHexElement = document.querySelector('#deserialize-hex')
var clearHexElement = document.querySelector('#clear-hex')

deserializeHexElement.addEventListener('click', function() {
  var bsonHexData = bsonHexInputElement.value
  try {
    var bsonData = hexStringToUint8Array(bsonHexData)
    var jsonData = BSON.deserialize(bsonData)
    showOutput(jsonData)
  } catch (err) {
    showError()
  }
})

clearHexElement.addEventListener('click', function() {
  bsonHexInputElement.value = ''
  bsonOutputWrapperElement.classList.add('hidden')
  errorOutputElement.classList.add('hidden')
  bsonOutputElement.classList.add('hidden')
})

function showOutput(output) {
  var json = JSON.stringify(output, 0, 2)
  var html = json.replace(/\r?\n/g, '<br>')
  bsonOutputElement.innerHTML = html
  bsonOutputWrapperElement.classList.remove('hidden')
  errorOutputElement.classList.add('hidden')
  bsonOutputElement.classList.remove('hidden')
}

function showError() {
  bsonOutputWrapperElement.classList.remove('hidden')
  errorOutputElement.classList.remove('hidden')
  bsonOutputElement.classList.add('hidden')
}

function hexStringToUint8Array(str) {
  // Remove prefixed 0x, if used like 0xBADA55
  if (str.substr(0, 2) === '0x') {
    str = str.substr(2)
  }

  // Remove spaces, if used like: BA DA 55
  if (str.substr(2, 1) === ' ') {
    str = str.replace(/ /g, '')
  }

  // Split into hex chunks
  const decArr = []
  while (str.length) {
    decArr.push(str.substr(0, 2))
    str = str.substr(2)
  }

  // Hex to Dec
  var hexArr = decArr.map(n => parseInt(n, 16))

  return Uint8Array.from(hexArr)
}
