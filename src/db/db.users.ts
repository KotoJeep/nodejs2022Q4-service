import { User } from './db.model';
import * as uuid from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { Errors } from '../enum.service';

const time = new Date().getTime();
interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class DbUsers {
  users: User[];

  constructor() {
    this.users = [
      {
        id: uuid.v4(),
        login: 'admin',
        password: 'admin',
        version: 1,
        createdAt: time,
        updatedAt: time,
      },
    ];
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOne(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);
    return user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  async remove(id: string): Promise<boolean> {
    const idx = this.users.findIndex((item) => item.id === id);
    if (!idx) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }
    this.users = this.users.splice(idx, 1);
    return true;
  }

  async update(id: string, data: UpdatePasswordDto): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);
    user.password = data.newPassword;
    user.updatedAt = time;
    user.version += 1;
    return user;
  }
}
