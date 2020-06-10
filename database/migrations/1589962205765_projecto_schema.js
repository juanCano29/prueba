'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectoSchema extends Schema {
    up() {
        this.create('projectos', (table) => {
            table.increments()
            table.integer("user_id").unsigned().references("id").inTable("users")
            table.string('nombre', 80).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('projectos')
    }
}

module.exports = ProjectoSchema