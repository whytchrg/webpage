
'use strict'

require('tinysort')

const Extend = require('../extend')

class Display extends Extend {

  constructor(options) {
    super()

    this.source = './src/' + options.table + '/'
    this.active = options.active

  }

  init(data, state) {

    const main = document.querySelector('body main')
    let article = main.querySelectorAll('article')

    for(let i = 0; i < article.length; i++) {
      article[i].parentNode.removeChild(article[i])
    }

    const raw = document.querySelector('body main template').content.querySelector('article')

    let loaded = []

    for(let i = 0; i < data.length; i++) {
      const template = document.importNode(raw, true)

      let img = template.querySelector('img')
      let figcaption = template.querySelector('figcaption')
      let title = figcaption.firstChild

      template.dataset.filename    = data[i].filename
      template.dataset.created     = data[i].created
      template.dataset.orientation = data[i].orientation
      template.dataset.display     = this.source + data[i].display
      template.dataset.thumbnail   = this.source + data[i].thumbnail
      template.classList.add('isvisible')
      template.classList.add('hidden')

      title.innerHTML = data[i].name
      const dC = new Date(parseInt(data[i].created))
      const text = document.createTextNode(plusNull(dC.getDate()) + '.' + plusNull(dC.getMonth() + 1) + '.' + dC.getFullYear() + ', ' + plusNull(dC.getHours()) + ':' + plusNull(dC.getMinutes()) + ':' + plusNull(dC.getSeconds()))
      title.after(text)

      let description = this.htmlToElements(data[i].description.replace(/"/g, '').replace(/\\/g, ''))
      let des =  Array.from(description);

      if(des.length > 0) {
        let br = document.createElement('br')
        figcaption.append(br)
      }

      for (var j = 0; j < des.length; j++) {
        if(des[j].constructor.name == 'HTMLAnchorElement') {
          des[j].setAttribute('target', 'a')
        }

        figcaption.append(des[j])
      }

      // var a = figcaption.querySelector('a')   // Get the first <h1> element in the document
      // var att = document.createAttribute('target')       // Create a "class" attribute
      // att.value = 'a'                           // Set the value of the class attribute
      // a.setAttributeNode(att)


      // console.log(figcaption.querySelector('a'))
      //
      // let a = figcaption.querySelector('a')
      // a.setAttribute('target', 'a')

      if( data[i].size === 'A') {

        figcaption.classList.add('figSmall')

        img.src = this.source + data[i].thumbnail
      }

      if( data[i].size === 'B') {
        template.classList.add('w2')

        figcaption.classList.add('figSmall')

        if(data[i].orientation == 'landscape') {
          img.src = this.source + data[i].display
        } else {
          img.src = this.source + data[i].thumbnail
        }

      }

      if( data[i].size === 'C') {
        template.classList.add('w4')

        figcaption.classList.add('figSmall')

        img.src = this.source + data[i].display
      }

      if(state) {
        if(state.charAt(i) === 'i') {
          template.classList.add('w8')

          figcaption.classList.add('figLarge')

          img.src = this.source + data[i].display
        }
      }
      loaded.push(img.onload = () => { return true })

      main.appendChild(template)
    }

    article = main.querySelectorAll('article')

    tinysort.defaults.order = 'desc'
    tinysort(article ,{ data: 'created' })


    Promise.all(loaded)
      .then(() => {
        for(let i = 0; i < article.length; i++) {
          article[i].classList.add('isvisible')
        }
      })

    this.click(article)

    return true
  } // evaluate

  click(article) {
    for (let i = 0; i < article.length; i++) {
      article[i].addEventListener('click', () => {
        let active = false
        if(article[i].classList.contains(this.active)) {
          active = true
        }

        const detail = { filename: article[i].dataset.filename, active: active }

        let event = new CustomEvent('display', { 'detail': detail })
        document.dispatchEvent(event)
      })
    }
  } // click

} // Display

module.exports = Display
