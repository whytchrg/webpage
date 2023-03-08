
'use strict'

const Html       = require('../html')
const Navigation = require('../navigation')
const Mysql      = require('../mysql')
const Algorithm  = require('../algorithm')
const Display    = require('../display')
const Grid       = require('../grid')

class Homepage {

  constructor(options) {

    this.html = new Html()

    this.category = new Navigation({
      selector: 'category',         // css class name
      rule:     'random',
      url:      true,
      active:   this.html.active
    })

    this.color = new Navigation({
      selector: 'color',            // css class name
      rule:     'random',
      url:      true,
      active:   this.html.active
    })

    this.mysql = new Mysql({
      client: options.client,
      table:  options.table
    })

    this.algorithm = new Algorithm({
      limit: options.limit
    })

    this.display = new Display({
      table:  options.table,
      active: this.html.active
    })

    this.grid = new Grid({
      grid:      this.html.content,
      elements:  'block', // class name
      size :     options.size,
      gutter:    1,
      sizeClass: 'w'
    })

    this.block = new Navigation({
      selector: 'block',            // css class name
      rule:     'off',
      active: this.html.active
    })

    this.init()
  } // constructor

  async init() {
    await this.html.init()

    const category = this.category.init()
    const color    = this.color.init()
    // const tags    = this.tags.init()
    const mysql    = this.mysql.init()

    await Promise.all([category, color, mysql])

    await this.overview()

    this.listener()
    return true
  } // init

  async overview() {
    // console.log(this.mysql.data)
    const result = await this.algorithm.evaluate(this.mysql.data, this.category.state, this.color.state)

    const display    = await this.display.init(result, this.block.state)
    const grid       = await this.grid.init()
    const navigation = await this.block.init()

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
      if(!event.detail.active) {
        this.mysql.views(event.detail.filename)
      }
    })

    document.addEventListener('address', (event) => {
      if(event.detail === false) {
        this.overview()
      } else {
        // console.log(this.html.navigationState)
        this.category.recieveHistory(this.html.navigationState)
        this.color.recieveHistory(this.html.navigationState)
      }
    })

    window.addEventListener('popstate', (event) => {
      // The popstate event is fired each time when the current history entry changes.

    //   console.log('back - back')

      this.category.init()
      this.color.init()

      this.overview()

    }, false)

    return true
  } // listener

} // Homepage

module.exports = Homepage
