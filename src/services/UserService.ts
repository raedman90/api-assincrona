import prisma from '../config/database';
import { User } from '../entities/User';

export class UserService {
  static async createUser(name: string, email: string): Promise<User> {
    return prisma.user.create({ data: { name, email } });
  }

  static async listUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
}