// import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
//
// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async (configService: ConfigService) => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: configService.get<number>('DB_PORT'),
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_DATABASE'),
//         synchronize: true,
//         migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
//         entities: [__dirname + '/src/entities/*{.ts,.js}'],
//         migrationsRun: false,
//       });
//
//       return dataSource.initialize();
//     },
//     inject: [ConfigService],
//   },
// ];

import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Charge les variables d'environnement

export const databaseProviders = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'H5_Book_blog',
  password: 'secret',
  database: 'H5_Book_blog',
  synchronize: true,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  entities: [__dirname + '/src/entities/*{.ts,.js}'],
  migrationsRun: false,
});
