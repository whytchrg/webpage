
'use strict'

class Html extends Extend{

  constructor(options) {
    super()
    // options: sidebar, sidebarWidth, sidebarActiv, sidebarDeact

    this.init(options)

    // section, aside, aside show

    this.sidebar      = options.sidebar || false
    this.sidebarLink

    this.sidebarWidth = options.sidebarWidth || 300
    this.sidebarActiv = this.key(4, 'css')
    this.sidebarDeact = this.key(4, 'css', this.sidebarActiv)

    // for class Grid
    this.section = document.querySelector('body main section')
    this.requestTarget = document.querySelector('body main aside')
  }

  init(options) {
    Html.meta().then((info) => {
      this.title(info)
      this.headline(info)
      this.navigation()
      this.main()
      this.footer(info)

      this.shape()

      this.resize()

      let event = new CustomEvent('init', { 'detail': info })
      document.dispatchEvent(event)
    })

  } // init

  resize() {
    window.addEventListener('resize', () => {
      this.shape()
    })
  } // rezize END !!

  shape() {
    let header   = document.querySelector('body header')
    let nav      = document.querySelector('body nav')
    let main     = document.querySelector('body main')
    let section  = document.querySelector('body main section')
    let sidebar  = document.querySelector('body main aside')
    let footer   = document.querySelector('body footer')
    let sideLink = document.querySelector('body footer').lastChild

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

  title(info) {
    document.title = info.title
  } // title

  headline(info) {
    let headline = document.querySelector('body header h1')
    headline.style.cursor = 'default'
    headline.style.marginBottom = document.querySelector('body header').offsetTop / 2 + 'px'
    headline.innerHTML = info.headline
  } // headline

  navigation() {
    let navigation = document.querySelector('body nav')
    navigation.style.cursor = 'default'
    navigation.style.userSelect = 'none'
    navigation.style.marginBottom = document.querySelector('body header').offsetTop / 2 + 'px'
  } // navigation

  main() {
    let main = document.querySelector('body main') // main
    main.style.paddingBottom = document.querySelector('body header').offsetTop / 2 + 'px'

    let sidebar = document.querySelector('body main aside') // sidebar
    sidebar.style.display = 'none'
    if(this.sidebar) sidebar.style.display = 'block'
    sidebar.style.position      = 'absolute'
    sidebar.style.overflowX     = 'scroll'
    sidebar.style.width         = this.sidebarWidth + 'px'
    sidebar.style.paddingLeft   = main.offsetLeft + 'px'
  } // main

  footer(info) {
    let footer = document.querySelector('body footer')
    footer.style.cursor     = 'default'
    footer.style.userSelect = 'none'
    const copy = '<span style="font-size:10px; position:relative; top: -1px">☯</span>'
    const year = '<span>' + new Date().getFullYear() + '</span>'
    const link = '<span><a href="' + info.link + '">' + info.copyright + '</a></span>'
    const text = copy + ' ' + year + ' ' + link
    footer.insertAdjacentHTML('afterbegin', text)
    const side = '<span class="' + this.key(4, 'css') +'" style="float: right; cursor: pointer">toggle sidebar</span>'
    footer.insertAdjacentHTML('beforeend', side)

    this.sidebarLink  = document.querySelector('body footer').lastChild.classList[0]
    // side
    let sideLink = document.querySelector('body footer').lastChild
    sideLink.classList.add(this.sidebarDeact)
    if(this.sidebar) sideLink.classList.add(this.sidebarActiv)

    sideLink.addEventListener('click', function() {
      sideLink.classList.toggle(this.sidebarDeact)
      sideLink.classList.toggle(this.sidebarActiv)

      this.shape()

      let eventDetail
      if(sideLink.classList.contains(this.sidebarDeact)) {
        eventDetail = false
      }
      if(sideLink.classList.contains(this.sidebarActiv)) {
        eventDetail = true
      }

      let event = new CustomEvent('sidebar', { 'detail': eventDetail })
      document.dispatchEvent(event)
    }.bind(this))

  } // footer

  static meta() {
    return new Promise((resolve, reject) => {
      let info = {
        module: 'html',
        name: 'html',
        title: 'title',
        headline: 'headline',
        link: './contact',
        copyright: 'whyturbocharge'
      }

      if(window.location.host.includes('localhost')) {
        info.title = 'localhost'
        info.headline = 'localhost'
        info.link = '../'
        info.copyright = 'localhost'
      }
      if(window.location.host.includes('debruen.com')) {
        info.title = 'Florian de Brün'
        info.headline = ''
        info.link = 'http://debruen.com/contact'
        info.copyright = 'Florian de Brün'
      }
      if(window.location.host.includes('whyturbocharge.com')) {
        info.title = 'Whyturbocharge?'
        info.headline = ''
        info.link = 'http://whyturbocharge.com/contact'
        info.copyright = 'Florian de Brün'
      }
      if(window.location.host.includes('tejat')) {
        info.title = '~whyturbocharge'
        info.headline = '~whyturbocharge'
        info.copyright = 'Florian de Brün'
      }
      if(window.location.host.includes('github')) {

      }
      resolve(info)
    })
  }

} // Html
