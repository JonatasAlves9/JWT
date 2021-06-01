import { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm';
import User from '../models/users';

interface Request {
  name: string;
  email: string;
  password: string;
  money: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    money,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUserInSameDate = await userRepository.findOne({
      where: { email },
    });
    
    if (findUserInSameDate) {
      throw Error('this user is already booked');
    }

    const user = userRepository.create({
      name,
      email,
      password,
      money,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;