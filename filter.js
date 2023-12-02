
'use strict'

class Filter {

    constructor(options) {
        this.limit = options.limit
        this.data = []
    }

    async evaluate(input, category, color) {

        const A = await this.filter(input, category, color)

        this.data = await this.cut(A)

        return true
    }

    async filter(input, category, color) {

        const A = await this.color(input, color)

        const B = await this.category(A, category)

        return B
    }

    cut(input) {
        input.sort((x,y) => (x.algorithm > y.algorithm) ? -1 : ((x.algorithm < y.algorithm) ? 1 : 0))

        let output = input.slice(0, this.limit);

        input.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

        const if_big = Math.floor(Math.random() * 2)
        const cut = Math.floor(output.length * 0.15)
        for(let i = 0; i < output.length; i++) {

            if(if_big == 0 && i == 0) {
                output[i].size = 'C'
            } else if (i < cut) {
                output[i].size = 'B'
            } else {
                output[i].size = 'A'
            }

        }
        output.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

        return output
    }

    color(input, color) {
        let select = []

        for(let i = 0; i < input.length; i++) {

            if(color === 'io') {
                if(input[i].keywords.search('bw') >= 0) select.push(input[i])
            } else if(color === 'oi') {
                if(input[i].keywords.search('color') >= 0) select.push(input[i])
            } else {
                select.push(input[i])
            }

        }
        return select
    }

    category(input, category) {
        let select = []

        for(let i = 0; i < input.length; i++) {

            if(category=='ioo'){
    		    if(input[i].keywords.search('abc') >= 0) select.push(input[i])

    	    } else if(category=='oio'){
    		    if(input[i].keywords.search('acb') >= 0) select.push(input[i])
    	    } else if(category=='ooi'){
    		    if(input[i].keywords.search('cba') >= 0) select.push(input[i])
    	    } else if(category=='iio'){
    		    if(input[i].keywords.search('abc') >= 0){
    			    select.push(input[i])
    		    } else if(input[i].keywords.search('acb') >= 0){
    			    select.push(input[i])
    		    }
    	    } else if(category=='ioi'){
    		    if(input[i].keywords.search('abc') >= 0){
    			    select.push(input[i])
    		    } else if(input[i].keywords.search('cba') >= 0){
    			    select.push(input[i])
    		    }
    	    } else if(category=='oii'){
    		    if(input[i].keywords.search('acb') >= 0){
    			    select.push(input[i])
    		    } else if(input[i].keywords.search('cba') >= 0){
    			    select.push(input[i])
    		    }
    	    } else if(category=='iii' || category=='ooo'){
                if(input[i].keywords.search('abc') >= 0){
                    select.push(input[i])
                } else if(input[i].keywords.search('acb') >= 0){
    			    select.push(input[i])
    		    }else if(input[i].keywords.search('cba') >= 0){
                    select.push(input[i])
                }
    	    } else {
    	        if(input[i].keywords.search(category) >= 0) select.push(input[i])
        	}

        }
        return select
    }

}
