
'use strict'

class Display {

  constructor(options) {

    this.source = './src/A5/'

  }

  evaluate(data) {

    const section = document.querySelector('body main')
    const article = document.querySelector('body main template').content.querySelector('article')

    let c = 0
    data.forEach((element, index, array) => {
      const template = document.importNode(article, true)

      template.querySelector('img').src = this.source + element.thumbnail
      template.dataset.filename  = element.filename
      template.dataset.created   = element.created
      template.dataset.display   = this.source + element.display
      template.dataset.thumbnail = this.source + element.thumbnail
      section.appendChild(template)

      c++
      if(c === array.length) {
        tinysort.defaults.order = 'desc'
        tinysort(section.querySelectorAll('article') ,{data:'created'})
        return true
      }

    })

  }

}
