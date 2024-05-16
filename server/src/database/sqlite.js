import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const sqliteInstance = (() => {
  let instance;

  async function openDb() {
    instance = await open({
      filename: './tmp/database.db',
      driver: sqlite3.Database
    })

    await createDb()
  }

  async function createDb() {    

    try {
      await instance.get('SELECT ID FROM USER')
    }
    catch {
      await instance.exec(
`CREATE TABLE USER (
  ID INTEGER PRIMARY KEY,
  USERNAME TEXT NOT NULL,
  PASSWORD TEXT NOT NULL
)`
      )
      await instance.exec('INSERT INTO USER VALUES (1, "usr", "pwd")')
    }

    try {
      await instance.get('SELECT ID FROM TASK')
    }
    catch {
      await instance.exec(
`CREATE TABLE TASK (
  ID INTEGER PRIMARY KEY,
  DESCRIPTION TEXT NOT NULL,
  COMPLETED TEXT NOT NULL DEFAULT 'N',
  TAG_ID INTEGER,
  USER_ID INTEGER NOT NULL,
  FOREIGN KEY (TAG_ID) REFERENCES TAG(ID),
  FOREIGN KEY (USER_ID) REFERENCES USER(ID)
)`
      )
    }

    try {
      await instance.get('SELECT ID FROM TAG')
    }
    catch {
      await instance.exec(
`CREATE TABLE TAG (
  ID INTEGER PRIMARY KEY,
  NAME TEXT NOT NULL,
  USER_ID INTEGER NOT NULL,
  FOREIGN KEY (USER_ID) REFERENCES USER(ID)
)`
      )
    }

  }

  return {
    getInstance: async function () {
        if (!instance) {
            await openDb();
        }

        return instance;
    }
};

})()

export default sqliteInstance