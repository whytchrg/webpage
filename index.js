window.onload = () => {

    const id = new ID()

    const options = {
        client: 'homepage',
        table:  'A5',
        size:   80,
        gap:    2,
        limit:  72,
        active: id.active
    }

    const get = new Get(options)

    const category = new Navigation({
        selector: 'category',
        rule:     'random',
        url:      true,
        active:   id.active
    })

    const color = new Navigation({
        selector: 'color',
        rule:     'random',
        url:      true,
        active:   id.active
    })

    const filter = new Filter(options)

    const grid = new Grid(options)

    document.addEventListener('navigation', (event) => {
        if(event.detail === 'category' || event.detail === 'color') {
            filter.evaluate(get.data, category.state, color.state)
            grid.play(filter.data, '')
            get.seen(filter.data)
        }
    })

    document.addEventListener('address', (event) => {
        if(event.detail === false) {
            grid.play(filter.data, '')
        } else {
            category.recieveHistory(id.navigationState)
            color.recieveHistory(id.navigationState)
        }
    })

    document.addEventListener('display', (event) => {
        if (event.detail != 0) {
            get.views(event.detail)  
        }
        grid.play(filter.data, event.detail) 
    })

    window.addEventListener('popstate', async (event) => {
        // The popstate event is fired each time when the current history entry changes.
        await Promise.all([category.init(), color.init()])
        await filter.evaluate(get.data, category.state, color.state)
        grid.play(filter.data, '')
    }, false)

    window.addEventListener("resize", (event) => {
        grid.play(filter.data, grid.select)
    }, false)

    const main = async () => {
        await id.init()
        await Promise.all([get.init(), category.init(), color.init()])

        await filter.evaluate(get.data, category.state, color.state)
        get.seen(filter.data)

        grid.play(filter.data, '')
    }

    main()
}