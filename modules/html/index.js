
'use strict'

class Html extends Extend{

  constructor() {
    super()

    this.content = document.querySelector('body main')
    this.contact = this.getContact()

  } // constructor

  async init() {
    const meta       = await this.meta()
    const title      = this.title(meta)
    const headline   = this.headline(meta)
    const navigation = this.navigation()
    const main       = this.main()
    const footer     = this.footer(meta)

    if(await Promise.all([title, headline, navigation, main, footer])) {
      return true
    }
  } // init

  meta() {
    let meta = {
      module: 'html',
      name: 'html',
      title: 'title',
      headline: 'headline',
      link: 'contact',
      copyright: 'whyturbocharge'
    }

    if(window.location.host.includes('localhost')) {
      meta.title = 'localhost'
      meta.headline = 'localhost'
      meta.copyright = 'localhost'
    }
    if(window.location.host.includes('debruen.com')) {
      meta.title = 'Florian de Brün'
      meta.headline = ''
      meta.copyright = 'Florian de Brün'
    }
    if(window.location.host.includes('whyturbocharge.com')) {
      meta.title = 'Whyturbocharge?'
      meta.headline = ''
      meta.copyright = 'Florian de Brün'
    }
    if(window.location.host.includes('tejat')) {
      meta.title = '~whyturbocharge'
      meta.headline = '~whyturbocharge'
      meta.copyright = 'Florian de Brün'
    }
    if(window.location.host.includes('github')) {
    }
    return(meta)
  }

  title(meta) {
    document.title = meta.title

    return true
  } // title

  headline(meta) {
    let headline = document.querySelector('body header h1')
    headline.style.cursor = 'default'
    headline.style.marginBottom = document.querySelector('body header').offsetTop / 2 + 'px'
    headline.innerHTML = meta.headline

    return true
  } // headline

  navigation() {
    let navigation = document.querySelector('body nav')
    navigation.style.cursor = 'default'
    navigation.style.userSelect = 'none'
    navigation.style.marginBottom = document.querySelector('body header').offsetTop / 2 + 'px'

    return true
  } // navigation

  main() {
    let main = document.querySelector('body main') // main
    main.style.paddingBottom = document.querySelector('body header').offsetTop / 2 + 'px'

    return true
  } // main

  footer(info) {
    let footer = document.querySelector('body footer')
    footer.style.cursor     = 'default'
    footer.style.userSelect = 'none'
    const copy = '<span style="font-size:10px; position:relative; top: -1px">☯</span>'
    const year = '<span>' + new Date().getFullYear() + '</span>'
    const link = '<span class="active">' + info.copyright + '</span>'
    const text = copy + ' ' + year + ' ' + link
    footer.insertAdjacentHTML('afterbegin', text)

    console.log(document.querySelector('body footer .active'))

    return true
  } // footer

  getContact() {
    const path = window.location.pathname.split('/').filter( (e) => { return e.includes('contact') })

    let contact = false
    if(path.length !== 0) {
      contact = true
    }

    return contact
  } // getContact

} // Html
