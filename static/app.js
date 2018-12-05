var bsonInputElement = document.querySelector('#bson_input')
var bsonInputButtonElement = document.querySelector('#bson_input-button')
var bsonInputFilenameElement = document.querySelector('#bson_input-filename')
var bsonHexInputElement = document.querySelector('#bson_hexinput')
var errorOutputElement = document.querySelector('.error')
var bsonOutputElement = document.querySelector('#bson_output')
var bsonOutputWrapperElement = document.querySelector('.layout__feature--bson')
var deserializeElement = document.querySelector('#deserialize')
var deserializeHexElement = document.querySelector('#deserialize-hex')
var clearElement = document.querySelector('#clear')
var clearHexElement = document.querySelector('#clear-hex')

bsonInputElement.addEventListener('change', function() {
  deserialize(bsonInputElement.files)
})

bsonInputButtonElement.addEventListener('click', function() {
  bsonInputElement.click()
})

deserializeElement.addEventListener('click', function() {
  deserialize(bsonInputElement.files)
})

clearElement.addEventListener('click', function() {
  bsonInputElement.value = ''
  bsonInputFilenameElement.innerHTML = 'none'
  bsonOutputWrapperElement.classList.add('hidden')
  errorOutputElement.classList.add('hidden')
  bsonOutputElement.classList.add('hidden')
})

bsonHexInputElement.addEventListener('change', function() {
  deserializeHex(bsonHexInputElement.value)
})

deserializeHexElement.addEventListener('click', function() {
  deserializeHex(bsonHexInputElement.value)
})

clearHexElement.addEventListener('click', function() {
  bsonHexInputElement.value = ''
  bsonOutputWrapperElement.classList.add('hidden')
  errorOutputElement.classList.add('hidden')
  bsonOutputElement.classList.add('hidden')
})

function deserialize(files) {
  if (files.length < 1) return
  var reader = new FileReader()
  reader.onload = function() {
    try {
      var bsonData = new Uint8Array(this.result)
      var jsonData = BSON.deserialize(bsonData)
      showOutput(jsonData)
      bsonInputFilenameElement.innerHTML = files[0].name
    } catch (err) {
      showError()
    }
  }
  reader.readAsArrayBuffer(files[0])
}

function deserializeHex(bsonHexData) {
  if (!bsonHexData) return
  try {
    var bsonData = hexStringToUint8Array(bsonHexData)
    var jsonData = BSON.deserialize(bsonData)
    showOutput(jsonData)
  } catch (err) {
    showError()
  }
}

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
