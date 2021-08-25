import { Post } from "../models/entity/Posts";
import { ICreatePostData } from "../types/index";
import { User } from "../models/entity/User";
import _, { create } from "lodash";
import { UserRole } from "../enums/user.role";
import { createQueryBuilder, getRepository } from "typeorm";
import { IInternalUser } from "../auth/IInternalUser";
import { getConnection } from "typeorm";

export const addPost = async (data: ICreatePostData, user: User) => {
  const { title, body } = data;

  if (_.isEmpty(title)) {
    throw new Error("title is required");
  }
  if (_.isEmpty(body)) {
    throw new Error("body is required");
  }

  const post = await Post.create({
    title: title,
    body: body,
    user: user,
  });

  await post.save();

  return post;
};

export const getAll = async (user: User) => {
  const findUser = await User.findOne({ id: user.id });
  let posts: Post[];

  if (findUser?.role === UserRole.ADMIN) {
    posts = await Post.find({ relations: ["user"] });
  } else {
    posts = await Post.find({
      where: { user: user.id },
      relations: ["user"],
    });
  }
  if (!posts) {
    throw new Error("Can't find any post");
  }
  return posts;
};

export const updatePost = async (
  userId: string,
  postId: string,
  body: ICreatePostData
) => {
  // check if the post exist
  // const post = await Post.findOne({ id: postId }, { relations: ["user"] });

  // checks if the post exists and belongst to the requesting user
  const post = await Post.findOne({
    where: { id: postId, user: userId },
    relations: ["user"],
  });
  if (!post) {
    throw new Error("Post not found");
  }

  // check if the post found belongs to the requesting user
  // if (post.user.id !== userId) {
  //   throw new Error("Can't update post ");
  // }

  let newPostTitle: string;
  let newPostBody: string;
  if (_.isEmpty(body.title)) {
    newPostTitle = post.title;
  } else {
    newPostTitle = body.title;
  }
  if (_.isEmpty(body.body)) {
    newPostBody = post.body;
  } else {
    newPostBody = body.body;
  }
  const newPost = await Post.update(postId, {
    title: newPostTitle,
    body: newPostBody,
  });

  return newPost;
};

export const deletePost = async (postId: string, user: User) => {
  const post = await Post.findOne({ where: { id: postId, user: user.id } });
  if (!post) {
    throw new Error("Can't find post");
  }

  const deletePost = await Post.delete(postId);

  return deletePost;
};

export const tryRoute = async (user: IInternalUser) => {
  // find user
  // const findUser = await getConnection()
  //   .createQueryBuilder()
  //   .select("user")
  //   .from(User, "user")
  //   .where("user.id = :id", { id: user.id })
  //   .getOne();

  //  create a new user

  // const newUser = await createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values({ email: "trial0@email.co", password: "123abc" })
  //   .execute();

  // update user

  // const updateUser = await createQueryBuilder()
  //   .update(User)
  //   .where({ id: "3fcdc56e-191c-4188-baa4-291b55d79af7" })
  //   .set({ password: "123abc" })
  //   .execute();

  // delete user
  // const deleteUser = await createQueryBuilder()
  //   .delete()
  //   .from(User)
  //   .where({ email: "surafel02@su.co" })
  //   .execute();

  // get many users
  // const users = await createQueryBuilder()
  //   .select("user")
  //   .from(User, "user")
  //   .getMany();

  // get raw data the pervious are entite data
  // const users = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .select("user.id")
  //   .addSelect("SUM(user.photosCount)", "sum")
  //   .groupBy("user.id")
  //   .getRawMany();
  //   // .select("SUM(user.photosCount)", "sum")
  //   // .select("SUM(user)", "sum")
  //   // .from(User, "user")

  // joining relations

  // const posts = await createQueryBuilder("user")
  //   .leftJoinAndSelect("user.posts", "post")
  //   .where("user.email = :email", {
  //     email: "surafel0@gmail.com",
  //   })
  //   .getOne();

  // const posts = await User.findOne({where:{email:"surafel0@gmail.com"},relations:["posts"]})

  // const userF = await getRepository("user")
  //   .createQueryBuilder("user")
  //   .leftJoinAndSelect("user.posts", "post")
  //   .where("user.email = :email", { email: "surafel0@gmail.com" })
  //   .printSql()
  //   .getOne();

  // const PostF = await getRepository("post")
  //   .createQueryBuilder("post")
  //   .leftJoinAndSelect("post.user", "user")
  //   .where("post.user = :user", {
  //     user: "c467e787-99cc-4f35-859a-09332009c65f",
  //   })
  //   .getMany();

  // // map from post's and assign a bio from that posts
  // const map = await getRepository("user")
  //   .createQueryBuilder("user")
  //   .leftJoinAndMapOne("user.bio", "user.posts", "bio")
  //   .where("user.email = :email", { email: "surafel0@gmail.com" })
  //   .getOne();

  // const { sum } = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .select("SUM(user.posts)", "sum")
  //   .where("user.email = :email", { email: "surafel0@gmail.com" })
  //   .getRawOne();

  // const stream = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .where("user.email = :email", { email: "surafel0@gmail.com" })
  //   .stream();

  // take and skip
  // const pagination = await getRepository(User)
  // .createQueryBuilder("user")
  // .leftJoinAndSelect("user.posts", "post")
  // .take(2)
  // .skip(2)
  // .getMany();

  // locking
  // const users = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .setLock("pessimistic_read")
  //   .getMany();

  // partial selection
  // const users = await getRepository(User)
  //   .createQueryBuilder("user")
  //   .select(["user.id", "user.email"])
  //   .getMany();

  // hidden columns
  const users = await getRepository(User)
    .createQueryBuilder("user")
    .addSelect("user.password")
    .getMany();
  return users;
};
