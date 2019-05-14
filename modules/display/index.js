
'use strict'

class Display {

  constructor(options) {

    this.source = './src/A5/'

  }

  evaluate(data) {

    let block = document.querySelectorAll('body main article')

    for(let i = 0; i < block.length; i++) {
      block[i].parentNode.removeChild(block[i])
    }

    const main = document.querySelector('body main')
    const article = document.querySelector('body main template').content.querySelector('article')

    for(let i = 0; i < data.length; i++) {
      const template = document.importNode(article, true)

      template.querySelector('img').src = this.source + data[i].thumbnail
      template.dataset.filename    = data[i].filename
      template.dataset.created     = data[i].created
      template.dataset.orientation = data[i].orientation
      template.dataset.display     = this.source + data[i].display
      template.dataset.thumbnail   = this.source + data[i].thumbnail
      main.appendChild(template)

    }

    tinysort.defaults.order = 'desc'
    tinysort(main.querySelectorAll('article') ,{ data: 'created' })

    return true
  } // evaluate

}
