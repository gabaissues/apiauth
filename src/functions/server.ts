import auth from '../routes/auth'

import cors from 'cors'
import express from 'express'

export default class Express  {

    private express: express.Application;
    private port: number;

    constructor(port: number) {

        console.log('[express] Express iniciado com sucesso.')

        this.port = port
        this.express = express()

        this.listen()
        this.middlewares()
        this.routes()

    }

    private listen() {

        this.express.listen(this.port, () => console.log(`[express] Servidor iniciado na porta ${this.port}`))

    }

    private middlewares() {

        this.express.use(express.json())
        this.express.use(cors())

    }

    private routes() {

        this.express.use('/auth', auth)

    }

}