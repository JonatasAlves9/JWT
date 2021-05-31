import { EntityRepository, Repository } from 'typeorm';

import User from '../models/users';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByDate(date: Date): Promise<User | null> {
    const findUser = await this.findOne({
      where: { date },
    });

    return findUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser || null;
  }
}

export default UserRepository;