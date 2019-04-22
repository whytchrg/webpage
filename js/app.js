document.addEventListener('DOMContentLoaded', function() {

  const html = new Html()

  const filtercategory = new Navigation({
    name:     'filtercategory',
    elements: 'filtercategory',  // className
    target:   'demoA' // id
  })

  const filtercolor = new Navigation({
    name:     'filtercolor',
    elements: 'filtercolor',
    target:   'demoB'
  })

  let grid = new DinGrid('grid', {
    elmClass: 'block',
    widthDefinition: 'w',
    standard : 48,
    gutter: 1,
  });

  // window resize
  window.addEventListener("resize", function() {
    html.style()
    grid.reload();
  }, false);

})
