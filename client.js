
document.addEventListener('DOMContentLoaded', function() {

  const html = new Html({
    // sidebar: 'active'
  })

  const category = new Navigation({
    name:     'category',         // string
    elements: 'category',         // css class name
    target:   html.requestTarget, // DOM element
    init:     'random'
  })

  const color = new Navigation({
    name:     'color',            // string
    elements: 'color',            // css class name
    target:   html.requestTarget, // DOM element
    init:     'random'
  })

  const mysql = new Mysql()

  const algorithm = new Algorithm()

  const grid = new Grid(html.section, {
    elements:  'block', // class name
    size :     48,
    gutter:    1,
    sizeClass: 'w'
  })

  const gridContent = new Navigation({
    name:     'grid',             // string
    elements: 'block',            // css class name
    target:   html.requestTarget, // DOM element
    init:     'off'
  })

  const display = new Display()

  // Html Sidebar event / send width of grid container to grid
  document.addEventListener('init', function(event) {
    if(event.detail.module === 'html') {
      console.log('☯ ' + new Date().getFullYear() + ' ' + event.detail.copyright)
    }
  })

  // Html Sidebar event / send width of grid container to grid
  document.addEventListener('sidebar', (event) => {
    grid.reload(html.section.clientWidth)
  })

  // Navigation response event ||
  document.addEventListener('navi', function(event) {
    console.log('Event: ' + event.type)
    html.shape()
    // ... code
  })

  document.addEventListener('mysql', function(event) {
    console.log('Event: ' + event.type)
    algorithm .evaluate(event.detail)
    display.evaluate(event.detail)
    // ... code
  })

  document.addEventListener('display', function(event) {
    console.log('Event: ' + event.type)
    grid.reload(html.section.clientWidth)
    // ... code
  })

}) // DOMContentLoaded
