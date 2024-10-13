import * as SQLite from 'expo-sqlite';
import { Himno, Himnario } from '@/components/types';

const openDb = async () => {
  const db = await SQLite.openDatabaseAsync('himnarioJovenes');
  return db;
};

const createTables = async () => {
  const db = await SQLite.openDatabaseAsync('himnarioJovenes', {
    useNewConnection: true,
  });

  try {
    // Crear tabla Himnos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Himnos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        letra TEXT NOT NULL,
        acorde TEXT
      )
    `);

    // Crear tabla Himnario
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Himnario (
        himnoId INTEGER NOT NULL,
        numero INTEGER NOT NULL,
        PRIMARY KEY (himnoId),
        FOREIGN KEY (himnoId) REFERENCES Himnos(id)
      )
    `);

    // Crear tabla Suplementario
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Suplementario (
        himnoId INTEGER NOT NULL,
        numero INTEGER NOT NULL,
        PRIMARY KEY (himnoId),
        FOREIGN KEY (himnoId) REFERENCES Himnos(id)
      )
    `);

    // Crear tabla Jovenes
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Jovenes (
        himnoId INTEGER NOT NULL,
        numero INTEGER PRIMARY KEY AUTOINCREMENT,
        FOREIGN KEY (himnoId) REFERENCES Himnos(id)
      )
    `);
  } catch (error) {
    console.error('Error al crear tablas: ', error);
  }
  return db;
};

export const saveHymns = async (
  hymns: Himno[],
  himnario: Himnario[],
  jovenes: Himnario[],
  suplementario: Himnario[],
): Promise<{
  updatedHymns: Himno[];
  updatedHymnarios: Himnario[];
  updatedJovenes: Himnario[];
  updatedSuplementary: Himnario[];
}> => {
  const db = await createTables();

  const insertedHymns = await Promise.all(
    hymns.map(async (hymn: Himno) => {
      try {
        // Insertar o reemplazar himno
        await db.runAsync(
          `INSERT OR REPLACE INTO Himnos (id, titulo, letra, acorde) VALUES (?, ?, ?, ?)`,
          [hymn.id, hymn.titulo, hymn.letra, hymn.acorde], // Asegúrate de incluir el id
        );

        return hymn; // Retorna el himno
      } catch (error) {
        // console.log('Error en guardar himno:', error);
        return null; // Retorna null en caso de error
      }
    }),
  );

  const insertedHymnarios = await Promise.all(
    himnario.map(async (hymn: Himnario) => {
      try {
        // Insertar o reemplazar himnario
        await db.runAsync(
          `INSERT OR REPLACE INTO Himnario (himnoId, numero) VALUES (?, ?)`,
          [hymn.himnoId, hymn.numero],
        );
        return hymn; // Retorna el himnario
      } catch (error) {
        // console.log('Error en guardar himnario:', error);
        return null; // Retorna null en caso de error
      }
    }),
  );

  const insertedJovenes = await Promise.all(
    jovenes.map(async (hymn: Himnario) => {
      try {
        // Insertar o reemplazar jovenes
        await db.runAsync(
          `INSERT OR REPLACE INTO Jovenes (himnoId, numero) VALUES (?, ?)`,
          [hymn.himnoId, hymn.numero],
        );
        return hymn; // Retorna el himnario
      } catch (error) {
        // console.log('Error en guardar jóvenes:', error);
        return null; // Retorna null en caso de error
      }
    }),
  );

  const insertedSuplementario = await Promise.all(
    suplementario.map(async (hymn: Himnario) => {
      try {
        // Insertar o reemplazar suplementario
        await db.runAsync(
          `INSERT OR REPLACE INTO Suplementario (himnoId, numero) VALUES (?, ?)`,
          [hymn.himnoId, hymn.numero],
        );
        return hymn; // Retorna el himnario
      } catch (error) {
        // console.log('Error en guardar suplementario:', error);
        return null; // Retorna null en caso de error
      }
    }),
  );
  await db.closeAsync();
  return {
    updatedHymns: insertedHymns.filter((hymn): hymn is Himno => hymn !== null),
    updatedHymnarios: insertedHymnarios.filter(
      (hymn): hymn is Himnario => hymn !== null,
    ),
    updatedJovenes: insertedJovenes.filter(
      (hymn): hymn is Himnario => hymn !== null,
    ),
    updatedSuplementary: insertedSuplementario.filter(
      (hymn): hymn is Himnario => hymn !== null,
    ),
  };
};

export const getHymnsFromDBLocal = async (): Promise<{
  hymns: Himno[];
  himnario: Himnario[];
  suplementario: Himnario[];
  jovenes: Himnario[];
} | null> => {
  try {
    const db = await openDb();

    // Consultar todas las tablas
    const hymns: Himno[] = await db.getAllAsync('SELECT * FROM Himnos');
    const himnario: Himnario[] = await db.getAllAsync('SELECT * FROM Himnario');
    const suplementario: Himnario[] = await db.getAllAsync(
      'SELECT * FROM Suplementario',
    );
    const jovenes: Himnario[] = await db.getAllAsync('SELECT * FROM Jovenes');
    await db.closeAsync();
    return {
      hymns,
      himnario,
      suplementario,
      jovenes,
    };
  } catch (error) {
    console.error(
      'Error al obtener himnos desde la base de datos local: ',
      error,
    );
    return null; // Retorna null en caso de error
  }
};

export const getHymn = async (id: string): Promise<Himno> => {
  const db = await openDb();

  const hymn = await db.getFirstAsync(
    `SELECT * FROM Himnos WHERE ID = ?`,
    [id], // Usando parámetros seguros
  );

  if (!hymn) {
    throw new Error(`No se encontró un himno con el ID: ${id}`);
  }
  await db.closeAsync();
  return hymn as Himno;
};

export const getNumberHymn = async (
  id: string,
  himnario: string,
): Promise<Himnario> => {
  const db = await SQLite.openDatabaseAsync('himnarioJovenes');
  const allowedHymnarios = ['Himnario', 'Suplementario', 'Jovenes'];

  if (!allowedHymnarios.includes(himnario)) {
    throw new Error(`Himnario no permitido: ${himnario}`);
  }

  const hymn = await db.getFirstAsync(
    `SELECT * FROM ${himnario} WHERE himnoId = ?`,
    [id],
  );
  await db.closeAsync();
  return hymn as Himnario;
};
export const deleteDatabase = async () => {
  const db = await openDb(); // Abre la base de datos
  await db.closeAsync();
  // Cierra la base de datos (si estás usando una conexión abierta)

  // Elimina la base de datos
  try {
    await SQLite.deleteDatabaseAsync('himnarioJovenes'); // Elimina la base de datos
    console.log('Base de datos eliminada con éxito.');
  } catch (error) {
    console.error('Error al eliminar la base de datos:', error);
  }
};
