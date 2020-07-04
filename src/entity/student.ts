import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  department: number;

  @Column()
  gender: string;

  @Column()
  dob: string;

  @Column()
  batch: string;

  @Column()
  startYear: string;

  @Column()
  endYear: string;
}
