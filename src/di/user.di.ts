import { PurchaseRepository } from "../infrastructor/repositories/purchaserepository";
import { UserRepository } from "../infrastructor/repositories/userrepository";
import { UserController } from "../presentation/controller/user/usercontroller";
import { OrdersgetByuserIduseCase } from "../usecases/checkout/getorderbyuserid";
import { UserAddAddressuseCase } from "../usecases/user/auth/addaddress";
import { AddressdeleteuseCase } from "../usecases/user/auth/addressdelet";
import { UserCreateuseCase } from "../usecases/user/auth/createuseCase";
import { FindUser } from "../usecases/user/auth/finduser";
import { UserGetAddressByuserId } from "../usecases/user/auth/getaddressbyuserid";
import { UserGetAddressByaddressId } from "../usecases/user/auth/getaddressusecase";
import { UserLoginuseCase } from "../usecases/user/auth/loginusecase";
import { UserUpdateuseCase } from "../usecases/user/auth/updateusecase";

const userrep = new UserRepository();
const orderrep = new PurchaseRepository();

const userlogin = new UserLoginuseCase(userrep);
const usersignup = new UserCreateuseCase(userrep);
const userupdate = new UserUpdateuseCase(userrep);
const addaddress = new UserAddAddressuseCase(userrep);
const finduser = new FindUser(userrep);
const getordersbyUserId = new OrdersgetByuserIduseCase(orderrep);
const getaddreesbyAddressId = new UserGetAddressByaddressId(userrep);
const getaddressbyuserId=new UserGetAddressByuserId(userrep)
const deleteaddress=new AddressdeleteuseCase(userrep)
export const usercontroller = new UserController(
  userlogin,
  usersignup,
  userupdate,
  addaddress,
  finduser,
  getordersbyUserId,
  getaddreesbyAddressId,
  getaddressbyuserId,
  deleteaddress

);
