import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Country } from './country.entity';

@Entity('country_borders')
export class CountryBorder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryCode: string;

  @Column()
  commonName: string;

  @Column()
  officialName: string;

  @Column()
  region: string;

  @ManyToOne(() => Country, (country) => country.borders)
  country: Country;
}
