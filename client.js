
document.addEventListener('DOMContentLoaded', function() {

  const homepage = new Homepage({
    client: 'homepage',
    table: 'A5',
    size: 56,
    limit: 86 //
  })

  window.addEventListener('resize', () => {
    console.log(document.querySelector('body main').offsetHeight)
  })

}) // DOMContentLoaded
