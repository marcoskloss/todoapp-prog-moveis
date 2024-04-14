// Ref: https://docs.expo.dev/versions/latest/sdk/sqlite

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'database.db'

const sqliteInstance = (() => {
  let instance;

  async function openDb() {
    instance = SQLite.openDatabase(DB_NAME);
    instance.sql = sql
    await createDb()
  }

  async function sql(sqlString, args = []) {
    [result] = await instance.execAsync([{ sql: sqlString, args }], false);
    console.log(`DEBUG`, result)
    return result.rows
  }

  async function createDb() {
    let result;

    [result] = await instance.execAsync([{ sql: 'SELECT ID FROM USER;', args: [] }], false);

    if (result.error) {
      console.log('[INFO] create table USER');
      await instance.execAsync([{ 
        sql: `
          CREATE TABLE IF NOT EXISTS USER (
            ID INTEGER PRIMARY KEY,
            USERNAME TEXT NOT NULL,
            PASSWORD TEXT NOT NULL
          )`, 
        args: [] 
      }], 
      false);

      await instance.execAsync([{ sql: 'INSERT INTO USER VALUES (1, "usr", "pwd")', args: [] }], false);
    }

    [result] = await instance.execAsync([{ sql: 'SELECT ID FROM TASK;', args: [] }], false);

    if (result.error) {
      console.log('[INFO] create table TASK');
      await instance.execAsync([{ 
        sql: `
          CREATE TABLE IF NOT EXISTS TASK (
            ID INTEGER PRIMARY KEY,
            DESCRIPTION TEXT NOT NULL,
            COMPLETED TEXT NOT NULL DEFAULT 'N',
            TAG_ID INTEGER,
            USER_ID INTEGER NOT NULL,
            FOREIGN KEY (TAG_ID) REFERENCES TAG(ID),
            FOREIGN KEY (USER_ID) REFERENCES USER(ID)
          )`, 
        args: [] 
      }], 
      false);
    }

    [result] = await instance.execAsync([{ sql: 'SELECT ID FROM TAG;', args: [] }], false);

    if (result.error) {
      console.log('[INFO] create table TAG');
      await instance.execAsync([{ 
        sql: `
        CREATE TABLE IF NOT EXISTS TAG (
          ID INTEGER PRIMARY KEY,
          NAME TEXT NOT NULL,
          USER_ID INTEGER NOT NULL,
          FOREIGN KEY (USER_ID) REFERENCES USER(ID)
        )`, 
        args: [] 
      }], 
      false);
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