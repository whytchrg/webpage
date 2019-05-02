
'use strict'

class Display {

  constructor(options) {

    this.data = []

    this.source = '../src/A5/'

  }

  evaluate(data) {

    const section = document.querySelector('body main section')
    const article = document.querySelector('body main section template').content.querySelector('article')

    let c = 0
    data.forEach((element, index, array) => {
      const template = document.importNode(article, true)
      template.querySelector('img').src = this.source + element.thumbnail
      section.appendChild(template)

      c++
      if(c === array.length) {
        let event = new CustomEvent('display')
        document.dispatchEvent(event)
      }

    })

    //
    // const test = htmlMain.children
    // let lll = watcher.getWatched()[folder].length
    // if(lll == test.length-1){
    //   tinysort(htmlMain.querySelectorAll('article'),{selector:'td:nth-child(2)',data:'name'})
    //   document.getElementById('foreground').hidden = true;
    // }

    console.log(data)
  }

}
