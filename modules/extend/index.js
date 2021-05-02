
'use strict'

class Extend {

  constructor() {

  }

  key(length, type, test) {
    let key   = ''
    let cssFirst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let space = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    for(var i = 0; i < length; i++) {
      let array = space
      if(type == 'css' && i == 0)
        array = cssFirst
      key += array.charAt( Math.floor( Math.random() * array.length ) )
    }

    // check against test
    if(key == test)
      this.key(length, type, test)

    return key
  } // key

  dir() {
    let dir = window.location.pathname.split('/')
    for(let i = 0; i < dir.length; i++)
      if(dir[i] == '')
        dir.splice(i, 1)
    return dir[dir.length-1]
  } // dir

  replaceCharAt(str, i, replace) {
    return str.substring(0, i) + replace + str.substring(i + 1)
  } // replaceCharAt

  htmlToElements(html) {
    var template = document.createElement('template')
    template.innerHTML = html
    return template.content.childNodes
  }

} // Extend

module.exports = Extend
