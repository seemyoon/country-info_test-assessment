import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CountryBorder } from './countryborder.entity';
import { PopulationData } from './populationdata.entity';

@Entity('countries')
export class Country {
  @PrimaryColumn()
  countryCode: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  commonName?: string;

  @Column({ nullable: true })
  officialName?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  flagUrl?: string;

  @OneToMany(() => CountryBorder, (border) => border.country)
  borders?: CountryBorder[];

  @OneToMany(() => PopulationData, (population) => population.country)
  populationData?: PopulationData[];
}
