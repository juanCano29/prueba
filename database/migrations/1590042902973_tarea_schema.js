'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TareaSchema extends Schema {
    up() {
        this.create('tareas', (table) => {
            table.increments()
            table.integer('projecto_id').unsigned().references('id').inTable('projectos')
            table.string('description', 80).notNullable()
                // cuando creamos una tarea por defecto sera falso 
                // cuando la completemos se va actualizar a verdadero
            table.boolean('completada').defaultTo(false)
            table.timestamps()
        })
    }

    down() {
        this.drop('tareas')
    }
}

module.exports = TareaSchema