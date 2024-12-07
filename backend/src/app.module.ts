import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { CountryModule } from './modules/countries/country.module';
import { PostgresModule } from './modules/postgres/postgres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    CountryModule,
  ],
})
export class AppModule {}
