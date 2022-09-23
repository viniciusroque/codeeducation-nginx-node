db = require('./db')


async function dropAndCreateTable(table){
  await dropTable(table)
  await createTable(table)
}

async function dropTable(table){
  try {
    db.query(
      `DROP TABLE if exists ${table}`
    )
  } catch (error) {
    console.log(`Error while drop table ${table}`, error.message)
    console.log(error)
  }
}

async function createTable(table){
  try {
    db.query(
      `CREATE TABLE if not exists ${table} (
        id INT(11) NOT NULL auto_increment,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`
    )
  } catch (error) {
    console.log(`Error while create table people`, error.message)
    console.log(error)
  }
}

async function insert(name){
  try {
    return await db.query(
      `INSERT INTO people (name) VALUES ('${name}')`
    )
  } catch (error) {
    console.log(`Error while insert people`, error.message)
    console.log(error)
  }
}

async function getAll(){
  try {
    return db.query(
      `SELECT name FROM people LIMIT 1000`
    )

  } catch (error) {
    console.log(`Error while get all people`, error.message)
    console.log(error)
  }
}

async function createAndGetAll(name){
  try {
    await insert(name)
    return getAll()
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createAndGetAll,
  dropAndCreateTable
}