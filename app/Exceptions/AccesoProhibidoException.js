'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoProhibidoException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    // primero tenemos que decirle que va a recibir como parametro un errr y que va hacer uso
    // de response para devolvernos la respuesta del servidor 
    handle(error, { response }) {
        return response.status(403).json({
            error: 'Acceso no permitido al recurso'
        })
    }
}

module.exports = AccesoProhibidoException