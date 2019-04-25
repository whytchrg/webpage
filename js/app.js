document.addEventListener('DOMContentLoaded', function() {

  const mysql = new Mysql()

  const html = new Html({
    sidebarActiv: 'active'
  })

  const filtercategory = new Navigation({
    name:     'ioA',              // string
    elements: 'ioA',              // css class name
    target:   html.requestTarget, // DOM element
    init:     'random'
  })

  const filtercolor = new Navigation({
    name:     'ioB',              // string
    elements: 'ioB',              // css class name
    target:   html.requestTarget, // DOM element
    init:     'random'
  })

  const grid = new Grid(html.grid, {
    elements:  'block', // class name
    size :     48,
    gutter:    1,
    sizeClass: 'w'
  })

  const gridContent = new Navigation({
    name:     'grid',              // string
    elements: 'block',              // css class name
    target:   html.requestTarget, // DOM element
    init:     'off'
  })

  const sidebar = new Navigation({
    name:     'sidebar',
    elements: html.sidebarLink,
    target:   html.requestTarget,
    init:     'off'
  })

console.log(Object.getPrototypeOf(sidebar))

// Html Sidebar event
document.addEventListener('sidebar', function(event) {
  console.log('Event: ' + event.type + ' { ' + event.detail + ' }')
  // ... code
  grid.reload(html.grid.clientWidth)
})

// Html Resize event
document.addEventListener('resize', function(event) {
  console.log('Event: ' + event.type + '  { width: ' + window.innerWidth + 'px, height: ' + window.innerHeight + 'px }')
  // ... code
})

// Navigation navi Resize event
document.addEventListener('navi', function(event) {
  console.log('Event: ' + event.type + '  { width: ' + window.innerWidth + 'px, height: ' + window.innerHeight + 'px }')
  // ... code
  html.shape()
})

document.addEventListener('mysql', function(event) {
  console.log('Event: ' + event.type)
  // console.log(event.details)
  // ... code
})

})
