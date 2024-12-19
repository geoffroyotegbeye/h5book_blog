import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  firstname: string;

  @Column({ type: 'varchar', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    nullable: false,
  })
  role: 'ADMIN' | 'USER';

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  active_at: Date;

  @Column({ type: 'varchar', nullable: true })
  profile_url: string;

  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  failed_login_attempts: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_verified: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  verified_at: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_locked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  locked_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  unlocked_at: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
