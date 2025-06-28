import { AppError } from "../../../config/AppError";
import { Address_types } from "../../../domain/entities/userEntity";
import { IUserRepository } from "../../../domain/interfaces/Iuserrep";
import { ErrorCodes, StatusCode } from "../../../types/types";

export class UserGetAddressByaddressId {
  constructor(private userrep: IUserRepository) {}

  async execute(userId: string, addressId: string): Promise<Address_types> {
    const address = await this.userrep.findaddressbyid(userId, addressId);

    if (!address)
      throw new AppError(ErrorCodes.addressNotFound, StatusCode.NOT_FOUND);

    return address;
  }
}
