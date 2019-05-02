'use strict'

class Html {

  constructor(options) {
    // options: sidebar, sidebarWidth, sidebarActiv, sidebarDeact

    this.website   = Html.information('website')
    this.directory = Html.information('directory')
    this.title     = Html.information('title')
    this.headline  = Html.information('headline')
    this.copyright = Html.information('copyright')
    this.footer    = Html.information('footer')

    console.log( this.footer )

    this.sidebar      = options.sidebar || false
    this.sidebarLink  = document.querySelector('body footer').lastChild.classList[0]
    this.sidebarWidth = options.sidebarWidth || 300
    this.sidebarActiv = options.sidebarActiv || Html.key(4, 'css')
    this.sidebarDeact = options.sidebarDeact || Html.key(4, 'css', this.sidebarActiv)

    this.style()

    // Events
    this.resize()
    this.click()

    // for class Grid
    this.grid = document.querySelector('body main section')
    this.requestTarget = document.querySelector('body main aside')
  }

  style() {
    // headline
    let headline = document.querySelector('body header')
    headline.style.cursor = 'default'
    headline.style.paddingBottom = headline.offsetTop / 2 + 'px'
    // navigation
    let navigation = document.querySelector('body nav')
    navigation.style.paddingBottom = headline.offsetTop / 2 + 'px'
    navigation.style.cursor     = 'default'
    navigation.style.userSelect = 'none'
    // main
    let main = document.querySelector('body main')
    main.style.paddingBottom = headline.offsetTop / 2 + 'px'
      // sidebar
      let sidebar = document.querySelector('body main aside')
      sidebar.style.display = 'none'
      if(this.sidebar) sidebar.style.display = 'block'
      sidebar.style.position      = 'absolute'
      sidebar.style.overflowX     = 'scroll'
      sidebar.style.width         = this.sidebarWidth + 'px'
      sidebar.style.paddingLeft   = main.offsetLeft + 'px'
      // sidebar.style.paddingBottom = main.offsetLeft + 'px'
    // footer
    let footer = document.querySelector('body footer')
    footer.style.cursor     = 'default'
    footer.style.userSelect = 'none'
      // side
      let sideLink = document.querySelector('body footer .' + this.sidebarLink)
      sideLink.classList.add(this.sidebarDeact)
      if(this.sidebar) sideLink.classList.add(this.sidebarActiv)

    this.shape()
  } // style END !!

  shape() {
    let header   = document.querySelector('body header')
    let nav      = document.querySelector('body nav')
    let main     = document.querySelector('body main')
    let section  = document.querySelector('body main section')
    let sidebar  = document.querySelector('body main aside')
    let footer   = document.querySelector('body footer')
    let sideLink = document.querySelector('body footer .' + this.sidebarLink)

    // Sidebar is hidden
    if (sideLink.classList.contains(this.sidebarDeact)) {
      section.style.width = main.clientWidth + 'px'
      section.style.removeProperty('min-height')
      sidebar.style.display = 'none';
    }

    // Sidebar is visible
    if (sideLink.classList.contains(this.sidebarActiv)) {
      section.style.width = main.clientWidth - this.sidebarWidth - main.offsetLeft + 'px'
      let minHeight = window.innerHeight - header.offsetHeight - nav.offsetHeight - footer.offsetHeight - header.offsetTop - (header.offsetTop / 2) * 3
      sidebar.style.display = 'block'
      sidebar.style.left = section.clientWidth + main.offsetLeft + 'px'
      sidebar.style.top =  section.offsetTop + 'px';

      if(minHeight > sidebar.clientHeight)
        minHeight = sidebar.clientHeight

      console.log(window.innerHeight )
      section.style.minHeight = minHeight + 'px'

      sidebar.style.maxHeight = section.clientHeight + 'px'
      sidebar.style.overflowY = 'scroll'
      sidebar.scrollTo(0,sidebar.scrollHeight)
    }
  } // shape END !!

  resize() {
    window.addEventListener('resize', function() {

      this.shape()

      let event = new CustomEvent('resize')
      document.dispatchEvent(event)
    }.bind(this))
  } // rezize END !!

  click() {
    let sideLink = document.querySelector('body footer .' + this.sidebarLink)
    sideLink.addEventListener('click', function() {
      sideLink.classList.toggle(this.sidebarDeact)
      sideLink.classList.toggle(this.sidebarActiv)

      this.shape()

      let eventDetail
      if(sideLink.classList.contains(this.sidebarDeact)) {
        eventDetail = false
      }
      if(sideLink.classList.contains(this.sidebarActiv))
        eventDetail = true

      let event = new CustomEvent('sidebar', { 'detail': eventDetail })
      document.dispatchEvent(event)

    }.bind(this))
  } // click END !!

  static information(option) {

    // returns the current website
    if(option == 'website') {
      return window.location.host
    }

    // returns the current directory
    if(option == 'directory') {
      let directory = window.location.pathname.split('/')

      for(let i = 0; i < directory.length; i++)
        if(directory[i] == '')
          directory.splice(i, 1)

      return directory[directory.length-1]
    }

    // creates and returns the current title
    if(option == 'title') {
      let title = Html.information('website') + ' /' + Html.information('directory')
      document.title = title
      return title
    }

    // creates and returns the current headline
    if(option == 'headline') {
      let headline = Html.information('directory')
      document.querySelector('body header h1').innerHTML = headline
      return headline
    }

    // creates and returns the current headline
    if(option == 'copyright') {
      let link
      let text
      if(window.location.host.includes('localhost')) {
        link = '../'
        text = 'localhost'
      }
      if(window.location.host.includes('debruen.com')) {
        link = 'debruen.com'
        text = 'Florian de Brün'
      }

      if(window.location.host.includes('whyturbocharge.com')) {
        link = 'whyturbocharge.com'
        text = 'whyturbocharge?'
      }

      if(window.location.host.includes('github')) {
        link = 'https://github.com/whyturbocharge'
        text = 'whyturbocharge?'
      }

      return {link: link, text: text}
    }

    // creates and returns the current footer
    if(option == 'footer') {
      const copy = '<span style="font-size:10px; position:relative; top: -1px">☯</span>'
      const year = '<span>' + new Date().getFullYear() + '</span>'
      const link = '<span><a href="' + Html.information('copyright').link + '">' + Html.information('copyright').text + '</a></span>'
      const side = '<span class="' + Html.key(4, 'css') +'" style="float: right; cursor: pointer">toggle sidebar</span>'

      const footer = copy + ' ' + year + ' ' + link

      document.querySelector('body footer').insertAdjacentHTML('afterbegin', footer)
      document.querySelector('body footer').insertAdjacentHTML('beforeend', side)

      return '☯ ' + new Date().getFullYear() + ' ' + Html.information('copyright').text
    }

  } // information END !!

  static key(length, type, test) {
    let key   = ''
    let cssFirst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let space = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    for(var i = 0; i < length; i++) {
      let array = space
      if(type == 'css' && i == 0)
        array = cssFirst
      key += array.charAt( Math.floor( Math.random() * array.length ) )
    }

    // check against test
    if(key == test)
      Html.key(length, test)

    return key
  } // key END !!

} // Html END !!
