'use strict'

const Preoject = use('App/Models/Projecto');
const Tarea = use('App/Models/Tarea');
const AutorizacioService = use('App/Services/AutorizacionService');

class TareaController {
    async index({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const projecto = await Preoject.find(id);
        AutorizacioService.verificarPermiso(projecto, user);
        // directamente retornar todas las tareas que pertenescan a un proyecto
        // es decir tomamos todas las tareas que pertenescan al proyecto
        return await projecto.tareas().fetch();
    }
    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { description } = request.all();
        const { id } = params;
        const proyecto = await Preoject.find(id);
        AutorizacioService.verificarPermiso(proyecto, user);
        const tarea = new Tarea();
        tarea.fill({
            description
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }
    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        // traemos el proyecto que al que pertenece nuestra tarea 
        const project = await tarea.projectos().fetch();
        // los proyectos contienen usuario pero las tareas no 
        AutorizacioService.verificarPermiso(project, user);
        tarea.merge(request.only([
            'description',
            'completada'
        ]));
        await tarea.save();
        return tarea;
    }
    async destroy({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        // traemos el proyecto que al que pertenece nuestra tarea 
        const project = await tarea.projectos().fetch();
        // los proyectos contienen usuario pero las tareas no 
        AutorizacioService.verificarPermiso(project, user);
        await tarea.delete();
        return tarea;
    }
}

module.exports = TareaController