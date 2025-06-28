import { Address_types, Create_AddressType, UserEntity } from "../entities/userEntity"


export interface IUserRepository{
    findByEmail(email:string):Promise<UserEntity|null>
    findById(id:string):Promise<UserEntity|null>
    create(user:UserEntity):Promise<UserEntity>
    findByName(name:string):Promise<UserEntity|null>
    update(id:string,userData:UserEntity):Promise<UserEntity|null>
    findAll():Promise<UserEntity[]>
    findAllUsers():Promise<UserEntity[]>
    findIdBlock(id:string):Promise<boolean>
    findIdBlockToogle(id:string,isActive:boolean):Promise<boolean>
    findallAuthors():Promise<UserEntity[]>
    findAdmin():Promise<UserEntity|null>
    addAddress(userid:string,address:Create_AddressType):Promise<Address_types|null>
    findaddressbyid(userid:string,addressid:string):Promise<Address_types|null>
    deleteaddressbyid(userId:string,addressId:string):Promise<boolean>

}