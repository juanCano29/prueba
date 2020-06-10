'use strict'

const Projecto = use('App/Models/Projecto');
const AutorizacioService = use('App/Services/AutorizacionService');

class ProyectoController {
    async index({ auth }) {

        const user = await auth.getUser();
        console.log(user.id);
        return await user.projectos().fetch();

    }
    async create({ auth, request }) {
            const user = await auth.getUser();
            const { nombre } = request.all();
            const project = new Projecto();
            project.fill({
                nombre
            });
            await user.projectos().save(project);
            return project;
        }
        //  estos parametros los tomamos de la ruta que se va a crear 
    async destroy({ auth, params }) {
            const user = await auth.getUser();
            const { id } = params;
            const project = await Projecto.find(id);
            AutorizacioService.verificarPermiso(project, user);
            await project.delete();
            return project;
            // SERVICIOS HELPERS PARA USAR EL MISMO CODIGO
            // crear una funcion que nos permita hacer un chequeo primero si el usuario que estamos 
            // utilizando tiene el mismo id que el proyecto
            // si el proyecto user id es distinto que user.id

            // esta condicion la vamnos a usar cuandoa la necesitemos hacer estos para distintos 
            // recursos proyectos taresas y clientes que se puede hacer extraerlo hacer un 
            // helper 
            // if (project.user_id !== user.id) {
            //     // uso de la respuesta y la respuesta va hacer del 403 que es prohibido
            //     return response.status(403).json({ mensaje: "Usted no es dueño de este proyecto" });
            // }

            //  eso ya elimina el proyecto 
            // await project.delete();
            // devolver el proyecto para que nos de una respuesta cuando se haya eliminado 
            // return project;
            //  se toma el usuario, encontrando un proyecto por el id 
            // hay que asegurar que solamente el usuario que es dueño de ese proyecto pueda realizar la peticion para elminar
        }
        // el metodo edit es cuando utilizamos adonis por completo para crear una web app 
        // y utilizamos todos los metodos y las vistas de adonis el metodo para las rest apis
        // es updat
    async update({ auth, params, request }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Projecto.find(id);
        // utilizar el proceso de verificacion
        AutorizacioService.verificarPermiso(project, user);
        // solo modifica los atributos especificados
        project.merge(request.only('nombre'));
        await project.save();
        return project;

    }
}

module.exports = ProyectoController