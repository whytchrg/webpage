
'use strict'

class Contact {

  constructor(options) {

    this.html = new Html()

    this.category = new Navigation({
      selector: 'category',         // css class name
      init:     'random'
    })

    this.color = new Navigation({
      selector: 'color',            // css class name
      init:     'random'
    })

    this.init()
  } // constructor

  async init() {

    const html     = await this.html.init()
    const category = await this.category.init('iii')
    const color    = await this.color.init()

  } // init

  listener() {

    document.addEventListener('navigation', (event) => {
      if(event.detail === 'category' || event.detail === 'color') {
        this.block.state = false
        this.overview()
      }
    })

    document.addEventListener('mysql', (event) => {
      this.overview()
    })

    document.addEventListener('display', (event) => {
      if(!event.detail.activ) {
        this.mysql.views(event.detail.filename)
      }
    })

    return true
  } // listener

} // Homepage
