
'use strict'

require('tinysort')

const Extend = require('../extend')

class Display extends Extend {

  constructor(options) {
    super()

    this.source = './' + options.table + '/'
    this.active = options.active

  }

  init(data, state) {

    console.log(data[0]['type'])

    const main = document.querySelector('body main')
    let article = main.querySelectorAll('article')
    
    for(let i = 0; i < article.length; i++) {
      article[i].parentNode.removeChild(article[i])
    }

    const raw = document.getElementById('image').content.querySelector('article')

    let loaded = []
    let list = []
    for(let i = 0; i < data.length; i++) {
      const template = document.importNode(raw, true)

      let video = template.querySelector('video')
      let img = template.querySelector('img')
      let figcaption = template.querySelector('figcaption')
      let audio = template.querySelector('figcaption > audio')
      let title = template.querySelector('figcaption > i')

      template.dataset.name        = data[i].name
      template.dataset.created     = data[i].created
      template.dataset.orientation = data[i].orientation
      template.dataset.type        = data[i].type
      template.dataset.media       = this.source + data[i].name
      template.dataset.display     = this.source + data[i].display
      template.dataset.medium      = this.source + data[i].medium
      template.dataset.thumbnail   = this.source + data[i].thumbnail
      template.classList.add('isvisible')
      template.classList.add('hidden')

      title.innerHTML = data[i].title
      const dC = new Date(parseInt(data[i].created * 1000))
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

      if( data[i].size === 'A') {

        video.classList.add('mediaSmall')
        figcaption.classList.add('figSmall')
        audio.classList.add('mediaSmall')

        img.src = this.source + data[i].thumbnail
      }

      if( data[i].size === 'B') {
        template.classList.add('w2')

        video.classList.add('mediaSmall')
        figcaption.classList.add('figSmall')
        audio.classList.add('mediaSmall')

        img.src = this.source + data[i].medium

      }

      if( data[i].size === 'C') {
        template.classList.add('w4')

        video.classList.add('mediaSmall')
        figcaption.classList.add('figSmall')
        audio.classList.add('mediaSmall')

        img.src = this.source + data[i].display
      }

        if(state) {
            if(state.charAt(i) === 'i') {
                template.classList.add('w8')

                figcaption.classList.add('figLarge')

                if(data[i]['type'] == 'audio/mpeg') {
                    img.src = this.source + data[i].display
                    audio.src = this.source + data[i].name
                } else if(data[i]['type'] == 'video/mp4') {
                    video.classList.add('mediaLarge')
                    video.src = this.source + data[i].name
                    img.src = ""
                    audio.classList.add('mediaSmall')
                } else {
                    video.classList.add('mediaSmall')
                    img.src = this.source + data[i].display
                    audio.classList.add('mediaSmall')
                }

            }
        }
        loaded.push(img.onload = () => { return true })
        list.append(data[i].name)
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

    const detail = { names: list, active: active }

    let event = new CustomEvent('seen', { 'detail': detail })
    document.dispatchEvent(event)
    
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

        const detail = { name: article[i].dataset.name, active: active }

        let event = new CustomEvent('views', { 'detail': detail })
        document.dispatchEvent(event)
      })
    }
  } // click

} // Display

module.exports = Display
