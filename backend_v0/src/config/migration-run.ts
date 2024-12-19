import { databaseProviders } from './database.providers';

const runMigrations = async () => {
  try {
    await databaseProviders.initialize();
    await databaseProviders.runMigrations();
    console.log('Migrations exécutées avec succès.');
  } catch (error) {
    console.error("Erreur lors de l'exécution des migrations:", error);
  } finally {
    await databaseProviders.destroy();
  }
};

runMigrations();
