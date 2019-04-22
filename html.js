'use strict'

class Html {

  constructor(options) {

    this.toggleAside = document.querySelector('body footer .toggleaside')
    this.main = document.querySelector('body main')
    this.section = document.querySelector('body main section')
    this.aside = document.querySelector('body main aside')
    this.footer = document.querySelector('body footer')
    this.year = new Date().getFullYear()

    this.resize()
    this.click()
    this.style()
    this.foot()

  }

  resize() {
    window.addEventListener('resize', function() {
      this.style()
    }.bind(this))
  }

  click() {
    this.toggleAside.addEventListener('click', function() {
      this.toggleAside.classList.toggle('activ')
      this.toggleAside.classList.toggle('deact')
      this.style()
    }.bind(this)) // toggleAside EventListener END !!

  } // click END !!

  style() {
    if(!this.toggleAside.classList.contains('deact') && !this.toggleAside.classList.contains('activ'))
      this.toggleAside.classList.add('deact')

    if (this.toggleAside.classList.contains('deact')) {
      this.aside.style.display = "none";
      this.section.style.width = this.main.clientWidth + 'px';
    } else {
      this.aside.style.display = "block";
      this.aside.style.paddingLeft = ( ( window.innerWidth - document.body.clientWidth ) / 2 ) + 'px'
      this.section.style.width = this.main.clientWidth - this.aside.clientWidth + 'px';
    }
  } // style END !!

  foot() {
    document.querySelector('body footer .year').innerHTML = this.year
    document.querySelector('body footer a').innerHTML = 'whyturbocharge'
    document.querySelector('body footer a').href = 'https://github.com/whyturbocharge/html'
  } // footer END !!

} // Html END !!
