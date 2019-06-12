
'use strict'

class Display {

  constructor(options) {

    this.source = './src/' + options.table + '/'

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

      template.dataset.filename    = data[i].filename
      template.dataset.created     = data[i].created
      template.dataset.orientation = data[i].orientation
      template.dataset.display     = this.source + data[i].display
      template.dataset.thumbnail   = this.source + data[i].thumbnail

      template.classList.add('hidden')

      loaded.push(img.onload = () => { return true })

      if( data[i].size === 'A') {

        img.src = this.source + data[i].thumbnail
      }

      if( data[i].size === 'B') {
        template.classList.add('w2')

        img.src = this.source + data[i].thumbnail
      }

      if( data[i].size === 'C') {
        template.classList.add('w4')

        img.src = this.source + data[i].display
      }

      if(state) {
        if(state.charAt(i) === 'i') {
          template.classList.add('w8')

          img.src = this.source + data[i].display
        }
      }

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
        let activ = false
        if(article[i].classList.contains('activ')) {
          activ = true
        }

        const detail = { filename: article[i].dataset.filename, activ: activ }

        let event = new CustomEvent('display', { 'detail': detail })
        document.dispatchEvent(event)
      })
    }
  } // click

}
