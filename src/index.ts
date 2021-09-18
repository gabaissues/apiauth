import './services/database'
import Express from './functions/server'

interface Options {
    port: number
}

class Core {

    options: Options
    constructor(options: Options) {

        console.log('[core] Core iniciado com sucesso.')

        this.options = options
        this.loadExpress()

    }

    loadExpress() {

        console.log('[express] Express sendo iniciado.')
        new Express(this.options.port)

    }

}

new Core({
    port: 3333
})