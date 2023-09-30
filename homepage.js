const Homepage = require('./modules/homepage')

document.addEventListener('DOMContentLoaded', ()=> {

  const homepage = new Homepage({
    client: 'homepage',
    table: 'A5',
    size: 64,
    limit: 72
  })

}) // DOMContentLoaded
