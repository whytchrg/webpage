
'use strict'

class Homepage {

  constructor(options) {

    this.html = new Html()

    this.category = new Navigation({
      name:     'category',         // string
      elements: 'category',         // css class name
      init:     'random'
    })

    this.color = new Navigation({
      name:     'color',            // string
      elements: 'color',            // css class name
      init:     'random'
    })

    this.mysql = new Mysql()

    this.algorithm = new Algorithm()

    this.display = new Display()

    this.grid = new Grid({
      grid: document.querySelector('body main'),
      elements:  'block', // class name
      size :     48,
      gutter:    1,
      sizeClass: 'w'
    })

    this.navigation = new Navigation({
      name:     'grid',             // string
      elements: 'block',            // css class name
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
    const result     = await this.algorithm.evaluate(this.mysql.data)
    const display    = await this.display.evaluate(result)
    const grid       = await this.grid.init()
    const navigation = await this.navigation.init()
    return true
  } // overview

  listener() {
    // Mysql listener
    document.addEventListener('mysql', (event) => {
      console.log(this.mysql.data)
      this.overview()
    })

    return true
  } // listener

} // Homepage
