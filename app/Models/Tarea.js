'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
    // una tarea pertenece a un proyecto
    projectos() {
        return this.belongsTo('App/Models/Projecto')
    }
}

module.exports = Tarea