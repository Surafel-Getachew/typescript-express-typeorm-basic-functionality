import { getRepository } from "typeorm";
import { connectToPg } from "../db/index";
import { Category } from "../models/entity/Category";
import { Question } from "../models/entity/Question";
import config from "../config";
import { createConnection } from "typeorm";

createConnection()
  .then(async (conn) => {
    console.log("connection created with pg");
    const category1 = await Category.create({
      name: "ORMS",
    });
    const category2 = await Category.create({
      name: "programming",
    });
    const question1 = await Question.create({
      title: "How to ask question",
      text: "Where can i ask TypeORM-related question",
      categories: [category1, category2],
    });

    await question1.save();
    console.log("all questions are saved");
    
  })
  .catch((err) => console.log(err));


