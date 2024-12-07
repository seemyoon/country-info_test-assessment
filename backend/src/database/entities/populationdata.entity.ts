import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Country } from './country.entity';

@Entity('population_data')
export class PopulationData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  value: number;

  @ManyToOne(() => Country, (country) => country.populationData)
  country: Country;
}
