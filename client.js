
document.addEventListener('DOMContentLoaded', function() {

  const html = new Html({
    sidebar: 'active'
  })

  // const filtercategory = new Navigation({
  //   name:     'category',         // string
  //   elements: 'category',         // css class name
  //   target:   html.requestTarget, // DOM element
  //   init:     'random'
  // })
  //
  // const filtercolor = new Navigation({
  //   name:     'color',            // string
  //   elements: 'color',            // css class name
  //   target:   html.requestTarget, // DOM element
  //   init:     'random'
  // })
  //
  // const grid = new Grid(html.grid, {
  //   elements:  'block', // class name
  //   size :     48,
  //   gutter:    1,
  //   sizeClass: 'w'
  // })
  //
  // const gridContent = new Navigation({
  //   name:     'grid',             // string
  //   elements: 'block',            // css class name
  //   target:   html.requestTarget, // DOM element
  //   init:     'off'
  // })
  //
  // const sidebar = new Navigation({
  //   name:     'sidebar',
  //   elements: html.sidebarLink,
  //   target:   html.requestTarget,
  //   init:     'off'
  // })
  //
  // const mysql = new Mysql()
  //
  // const display = new Display()

// Html Sidebar event / send width of grid container to grid
document.addEventListener('sidebar', function(event) {
  // grid.reload(html.grid.clientWidth)
})

// Html Resize event not in use / grid resizes on its own
document.addEventListener('resize', function(event) {
  // ... code
})

// // Navigation response event ||
// document.addEventListener('navi', function(event) {
//   console.log('Event: ' + event.type)
//   html.shape()
//   // ... code
// })
//
// document.addEventListener('mysql', function(event) {
//   console.log('Event: ' + event.type)
//   display.evaluate(event.detail)
//   // ... code
// })
//
// document.addEventListener('display', function(event) {
//   console.log('Event: ' + event.type)
//   grid.reload(html.grid.clientWidth)
//   // ... code
// })

}) // DOMContentLoaded
