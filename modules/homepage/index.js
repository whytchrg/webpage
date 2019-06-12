
'use strict'

class Homepage {

  constructor(options) {

    this.categoryState
    this.colorState
    this.contact

    this.html = new Html()

    this.category = new Navigation({
      selector: 'category',         // css class name
      init:     'random'
    })

    this.color = new Navigation({
      selector: 'color',            // css class name
      init:     'random'
    })

    this.mysql = new Mysql({
      client: options.client,
      table:  options.table
    })

    this.algorithm = new Algorithm({
      limit: options.limit
    })

    this.display = new Display({
      table:  options.table
    })

    this.grid = new Grid({
      grid:      document.querySelector('body main'),
      elements:  'block', // class name
      size :     options.size,
      gutter:    1,
      sizeClass: 'w'
    })

    this.block = new Navigation({
      selector: 'block',            // css class name
      init:     'off'
    })

    let base
    if(window.location.pathname.includes('~')) {
      base = ''
    } else {
      base = ''
    }

    window.history.pushState("object or string", "Title", base + "new-url");

    console.log( window.location.pathname.split('/').filter( (e) => { return e.includes('~') }) )

    this.init()
  } // constructor

  async init() {
    const html     = await this.html.init()
    const category = await this.category.init()
    const color    = await this.color.init()

    const mysql    = await this.mysql.init()
    const overview = await this.overview()

    return this.listener()
  } // init

  async overview() {
    const result     = await this.algorithm.evaluate(this.mysql.data, this.category.state, this.color.state)
    const display    = await this.display.init(result, this.block.state)

    const grid       = await this.grid.init()
    const navigation = await this.block.init(this.block.state)

    return true
  } // overview

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
