import { Address_types, UserEntity } from "../../domain/entities/userEntity";
import { IUserRepository } from "../../domain/interfaces/Iuserrep";
import { IUser, UserModel } from "../models/usermodel";

const ReturnUser = (user: IUser): UserEntity => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    password: user.password,
    revenue:user.revenue,
    Address:user.Address,
    mobile:user.mobile,
    profile:user.profile,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
export class UserRepository implements IUserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const userData = await UserModel.create(user);
    return ReturnUser(userData);
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email: email });
    if (!user) return null;
    return ReturnUser(user);
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return ReturnUser(user);
  }

  async findByName(name: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ name });
    if (!user) return null;
    return ReturnUser(user);
  }
  async update(id: string, userData: UserEntity): Promise<UserEntity | null> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: userData.name,
          mobile:userData.mobile,
          profile:userData.profile
        },
      },
      { upsert: true, new: true } 
    );

    return ReturnUser(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await UserModel.find({role:{$nin:["ADMIN"]}});
    return users.map((user) => ReturnUser(user));
  }

  async findIdBlock(id: string): Promise<boolean> {
    const update = await UserModel.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { upsert: true, new: true }
    );
    if (!update) return false;
    return true;
  }


async  addAddress(userid: string, address: Address_types): Promise<Address_types|null> {

 const updatedUser = await UserModel.findByIdAndUpdate(
    userid,
    { $push: { Address: address } },
    { new: true } // returns updated document
  );

  if (!updatedUser) return null;

if (updatedUser.Address && updatedUser.Address.length > 0) {
  return updatedUser.Address[updatedUser.Address.length-1];
} 
return null

}



async findAdmin(): Promise<UserEntity | null> {
  
  const admin=await UserModel.findOne({role:"ADMIN"})
  if(!admin)return null
  return ReturnUser(admin)
    
}


async findaddressbyid(userid: string, addressid: string): Promise<Address_types | null> {
  const useraddress=await UserModel.findById(userid)
  if(!useraddress||!useraddress.Address)return null
   const foundAddress = useraddress.Address.find((addr) => addr._id.toString() === addressid);
  return foundAddress || null;
    
}


async findallAuthors(): Promise<UserEntity[]> {
    const authors=await UserModel.find({role:"AUTHOR"})
    return authors.map(ReturnUser)
    
}

async deleteaddressbyid(userId: string, addressId: string): Promise<boolean> {
   const user = await UserModel.findById(userId);
  if (!user || !user.Address) return false;

  const index = user.Address.findIndex(
    (addr) => addr._id.toString() === addressId
  )

  if (index === -1) return false;

  user.Address.splice(index, 1); 
  await user.save(); 

  return true;
 
    
}

async findIdBlockToogle(id: string, isActive: boolean): Promise<boolean> {

const user=await UserModel.findByIdAndUpdate(id,{
  $set:{
    isActive:!isActive
  }
},{new:true,upsert:true}) 

if(!user)return false
return true
}


}
