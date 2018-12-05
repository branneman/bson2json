var bsonInputElement = document.querySelector('#bson_input')
var bsonHexInputElement = document.querySelector('#bson_hexinput')
var bsonOutputElement = document.querySelector('#bson_output')
var bsonOutputWrapperElement = document.querySelector('.layout__feature--bson')

bsonHexInputElement.addEventListener('change', function() {
  var bsonHexData = bsonHexInputElement.value
  var bsonData = hexStringToUint8Array(bsonHexData)
  var jsonData = BSON.deserialize(bsonData)
  showOutput(jsonData)
})

function showOutput(output) {
  var json = JSON.stringify(output, 0, 2)
  var html = json.replace(/\r?\n/g, '<br>')
  bsonOutputElement.innerHTML = html
  bsonOutputWrapperElement.classList.remove('hidden')
}

function hexStringToUint8Array(str) {
  // Remove prefixed 0x, if available
  if (str.substr(0, 2) === '0x') {
    str = str.substr(2)
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
