
'use strict'

class Homepage {

  constructor(options) {

    this.html = new Html()

    this.category = new Navigation({
      client: options.client,
      table: 'navigation',
      selector: 'category',         // css class name
      init:     'random'
    })

    this.color = new Navigation({
      client:   options.client,
      table:    'navigation',
      selector: 'color',            // css class name
      init:     'random'
    })

    this.mysql = new Mysql({
      client: options.client,
      table:  options.table
    })

    this.algorithm = new Algorithm()

    this.display = new Display({
      table:  options.table
    })

    this.grid = new Grid({
      grid:      document.querySelector('body main'),
      elements:  'block', // class name
      size :     48,
      gutter:    1,
      sizeClass: 'w'
    })

    this.navigation = new Navigation({
      client:   options.client,
      table:    options.table,
      selector: 'block',            // css class name
      init:     'off'
    })

    this.init()

  } // constructor

  async init() {

    const html     = await this.html.init()

    const category = this.category.init()
    const color    = this.color.init()

    if(await category && await color) {
      const navigation = true
    }

    const mysql    = this.mysql.init()

    return this.listener()

  } // init

  async overview() {
    // console.log(this.mysql.data)
    const result     = await this.algorithm.evaluate(this.mysql.data, this.category.state, this.color.state)
    const display    = await this.display.evaluate(result)
    const grid       = await this.grid.init()
    const navigation = await this.navigation.init()
    return true
  } // overview

  listener() {

    document.addEventListener('navi', (event) => {
      if(event.detail === 'category' || event.detail === 'color') {
        this.overview()
      }
    })

    // Mysql listener
    document.addEventListener('mysql', (event) => {
      console.log('mysql')
      this.overview()
    })



    return true
  } // listener

} // Homepage
