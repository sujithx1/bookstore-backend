import { AppError } from "../../../config/AppError";
import { hashfn } from "../../../config/hash";
import { UserEntity } from "../../../domain/entities/userEntity";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { UserMap } from "../../../map/usermap";
import {
  ErrorCodes,
  StatusCode,
  UserCreate_types,
  UserMap_type,
} from "../../../types/types";

export class UserCreateuseCase {
  constructor(private userrep: IUserRepository) {}

  async execute(userData: UserCreate_types): Promise<UserMap_type> {
    const findemail = await this.userrep.findByEmail(userData.email);
    if (findemail)  throw new AppError(ErrorCodes.emailAlreadyExists, StatusCode.BAD_REQUEST);
    const hash = await hashfn(userData.password);
    const newUser: UserEntity = {
      id: "",
      ...userData,
      password: hash,
      revenue:0,

      isActive: true,
      
    };
    return UserMap(await this.userrep.create(newUser));
  }
}
