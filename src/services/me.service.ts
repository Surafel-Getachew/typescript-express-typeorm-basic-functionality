import { createQueryBuilder } from "typeorm";
import { User } from "../models/entity/User";
import { IAuthData } from "../auth/IAuthData";
import { checkPassword } from "../util/auth";
import { generateAuthToken } from "../util/jwt";
import _ from "lodash";

const userSelect = "name phone email organization role";

export const signUp = async (data: IAuthData) => {
  const { email, password,role } = data;

  const user = await User.findOne({ email: email });

  if (user) {
    throw new Error("User already registered");
    // return user;
  }

  const newUser = await User.create({
    email: email,
    password: password,
    role:role
  });

  await newUser.save();

  const token = generateAuthToken(newUser);

  return token;
};

export const login = async (data: IAuthData) => {
  const { email, password } = data;

  if (_.isEmpty(email)) {
    throw new Error("email is required");
  }
  if (_.isEmpty(password)) {
    throw new Error("password is required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await createQueryBuilder("user")
    .select("user.password")
    .from(User, "user")
    .where("user.id = :id", { id: user.id })
    .getOne();

  const validPassword = checkPassword(hashedPassword!.password!, password);

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = generateAuthToken(user);

  return token;
};

// export async function login(data: IAuthData) {
//   if (!data) throw new Error("data.required");
//   if (!data.password) throw new Error("data.password.required");
//   if (!data.email) throw new Error("data.email.required");

//   const user: any = await User.findOne({ email: data.email }).select(
//     "hashedPassword salt" + userSelect
//   );
//   //   .populate([
//   //     {
//   //       // path: "organization",
//   //       select: "name",
//   //     },
//   //   ])
//   //   .lean();
//   if (!user) {
//     throw new Error("User not found");
//   }
//   //   if (!user.salt) {
//   //     throw new Error("Salt not found");
//   //   }
//   //   if (!user.hashedPassword) {
//   //     throw new Error("User not found");
//   //   }
//   //   if (
//   //     !user ||
//   //     !user.salt ||
//   //     !user.hashedPassword ||
//   //     encryptPassword(data.password, user.salt) !== user.hashedPassword
//   //   ) {
//   //     throw new Error("Invalid email or password");
//   //   }

//   const token = await signToken(user._id.toString(), user.role);

//   delete user.salt;
//   delete user.hashedPassword;

//   return {
//     user: user,
//     token,
//   };
// }
