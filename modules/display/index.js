
'use strict'

class Display {

  constructor(options) {

    this.source = './src/A5/'

  }

  evaluate(data) {

    const section = document.querySelector('body main section')
    const article = document.querySelector('body main section template').content.querySelector('article')

    let c = 0
    data.forEach((element, index, array) => {
      const template = document.importNode(article, true)

      template.querySelector('img').src = this.source + element.thumbnail
      template.dataset.filename = element.filename
      template.dataset.created = element.created
      section.appendChild(template)

      c++
      if(c === array.length) {
        let event = new CustomEvent('display')
        tinysort.defaults.order = 'desc'
        tinysort(section.querySelectorAll('article') ,{data:'created'})
        document.dispatchEvent(event)
      }

    })

    console.log(data)
  }

}
