import { NextFunction, Request, Response } from "express";
import { UserLoginuseCase } from "../../../usecases/user/auth/loginusecase";
import { AppError } from "../../../config/AppError";
import { ErrorCodes, StatusCode } from "../../../types/types";
import { UserCreateuseCase } from "../../../usecases/user/auth/createuseCase";
import { UserUpdateuseCase } from "../../../usecases/user/auth/updateusecase";
import { generateAcceToken, generateRefreshToken } from "../../../config/jwt";
import { UserAddAddressuseCase } from "../../../usecases/user/auth/addaddress";
import { FindUser } from "../../../usecases/user/auth/finduser";
import { OrdersgetByuserIduseCase } from "../../../usecases/checkout/getorderbyuserid";
import { UserGetAddressByaddressId } from "../../../usecases/user/auth/getaddressusecase";
import { UserGetAddressByuserId } from "../../../usecases/user/auth/getaddressbyuserid";
import { AddressdeleteuseCase } from "../../../usecases/user/auth/addressdelet";

export class UserController {
  constructor(
    private loginusecase: UserLoginuseCase,
    private signupusecase: UserCreateuseCase,
    private userupdateusecase: UserUpdateuseCase,
    private addaddressusecase: UserAddAddressuseCase,
    private finduserusecase: FindUser,
    private usergetorderbyuserIdusecase: OrdersgetByuserIduseCase,
    private usergetaddressbyaddressId: UserGetAddressByaddressId,
    private usergetaddressesbyuserid: UserGetAddressByuserId,
    private userdeleteAddressbyid: AddressdeleteuseCase,
  ) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );
      const user = await this.loginusecase.execute(email, password);
      const accessToken = generateAcceToken({ id: user.id, role: user.role });
      const refreshToken = generateRefreshToken({
        id: user.id,
        role: user.role,
      });

      return res
        .cookie(`${user.role}_refreshToken`, refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(StatusCode.OK)
        .json({
          success: true,
          message: "Login Success",
          user,
          token: accessToken,
        });
    } catch (error) {
      return next(error);
    }
  }
  async Signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password, mobile, role } = req.body;
      if (!email || !name || !password || !mobile || !role)
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );
      const user = await this.signupusecase.execute({
        email,
        name,
        password,
        mobile,
        role,
      });
      return res
        .status(StatusCode.CREATED)
        .json({ success: true, message: "User Created", user });
    } catch (error) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, mobile, profile } = req.body;
      console.log(profile);

      const { id } = req.params;
      if (!name || !mobile)
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );
      const user = await this.userupdateusecase.execute(
        id,
        name,
        mobile,
        profile
      );
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "User updated", user });
    } catch (error) {
      return next(error);
    }
  }
  async Addaddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, line, city, state, pincode, phone } = req.body;
      const { userId } = req.params;
      if (!userId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
      if (!name || !line || !city || !state || !phone || !pincode)
        return next(
          new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
        );

      const address = await this.addaddressusecase.execute(userId, {
      
        name,
        city,
        line,
        phone,
        pincode,
        state,
      });

      return res
        .status(StatusCode.CREATED)
        .json({ success: true, message: "Address Added", address });
    } catch (error) {
      return next(error);
    }
  }
  // async deleteAddress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { index } = req.body;
  //     const { userId } = req.params;
  //     if (!index)
  //       return next(
  //         new AppError(ErrorCodes.validationError, StatusCode.BAD_REQUEST)
  //       );
  //     if (!userId)
  //       return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));
      const user = await this.finduserusecase.execute(id);
      const role = user.role;

      res
        .clearCookie(`${role}_refreshToken`, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(StatusCode.OK)
        .json({ success: true, message: "User logout success" });
    } catch (err) {
      next(err);
    }
  }
  async getuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.finduserusecase.execute(id);
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "user", user });
    } catch (error) {
      return next(error);
    }
  }
  async getordersbyuserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));

      const orders = await this.usergetorderbyuserIdusecase.execute(userId);
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "user", orders });
    } catch (error) {
      return next(error);
    }
  }
  async getaddressbyaddressid(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId ,addressId} = req.params;
     
      if (!userId||!addressId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

      const address = await this.usergetaddressbyaddressId.execute(
        userId,
        addressId
      );
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "user", address });
    } catch (error) {
      return next(error);
    }
  }
  async getaddressesbyuserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId} = req.params;
     
      if (!userId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

      const addresses = await this.usergetaddressesbyuserid.execute(
        userId      );
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "user", addresses  });
    } catch (error) {
      return next(error);
    }
  }
  async deleteuseraddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId,addressId} = req.params;
     
      if (!userId||!addressId)
        return next(new AppError(ErrorCodes.missingId, StatusCode.BAD_REQUEST));   

      const address= await this.userdeleteAddressbyid.execute(
        userId,addressId);
      return res
        .status(StatusCode.OK)
        .json({ success: true, message: "user", address  });
    } catch (error) {
      return next(error);
    }
  }







  // async login(req:Request,res:Response,next:NextFunction){
  //     try {

  //     } catch (error) {
  //         return next(error)
  //     }
  // }
}
