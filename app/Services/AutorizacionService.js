// en los helpers podemos crear excepciones que nos ayuden con el status del servidor
// importamos la excepcion 
const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException');
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException')
class AutorizacionService {
    // se crea un verificador de permisos recibe como parametros
    // el recurso a utilizar proyectos recursos etc 
    // que es lo que va hacer 
    verificarPermiso(recurso, user) {
        // si el rcurso no existe que va hacer:::: si no hay recurso
        // entonces que devuelva  
        if (!recurso) {
            throw new RecursoNoEncontradoException();
        }

        // es el que valida el recurso que le vamos a enviar
        if (recurso.user_id !== user.id) {
            // uso de la respuesta y la respuesta va hacer del 403 que es prohibido
            throw new AccesoProhibidoException();
        }
    }
}

module.exports = new AutorizacionService();