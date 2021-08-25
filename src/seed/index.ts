import _ from "lodash";
import mongoose from "mongoose"
import config from "../config";

import * as user from "./data/user";


const collections:any = {
    user
}

export async function create(obj: any) {
    mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
  
    // Empty collections
  
    await Promise.all(
      Object.keys(collections).map((colKey) => {
        return collections[colKey].model.deleteMany({});
      })
    );
  
    // Create result object of items included in the create obj
    let result = _.mapValues(obj, (value: any, colKey: string) => {
      const transformed = transformItem(value);
  
      return _.mapValues(transformed, (overrides: any, docKey: string) => {
        return {
          _id: mongoose.Types.ObjectId(), // Always add ObjectId
          ...collections[colKey].base, // E.g. user base object in data file
          ...collections[colKey].documents[docKey],
          ...overrides, // Overrides from create function
        };
      });
    });
  
    // Resolve functions, Refs, and include referenced objects into result object
    result = _.mapValues(result, (col) => {
      return _.mapValues(col, (doc) => {
        return parse(doc);
      });
    });
  
    // Insert documents to DB
    await Promise.all(
      _.map(result, async (value: any, colKey: string) => {
        const docs = _.map(value);
        const createdDocs = await collections[colKey].model.create(docs);
        for (const docKey of Object.keys(value)) {
          // Return as plain objects. ObjectIds converted to strings
          result[colKey][docKey] = JSON.parse(
            JSON.stringify(createdDocs.shift())
          );
        }
      })
    );
  
    return result;
  
    // Resolve functions, Refs, and include referenced objects into result object
    function parse(doc: any) {
      return traverse(doc);
  
      function traverse(item: any): any {
        // if (item instanceof RefClass) {
        //   return getPath(item.path);
        // }
  
        if (_.isFunction(item)) {
          return item(doc);
        }
  
        if (_.isArray(item)) {
          return item.map(traverse);
        }
  
        if (_.isPlainObject(item)) {
          return _.mapValues(item, traverse);
        }
  
        return item;
      }
    }
  
    // Resolve Refs
    // function getPath(path: string) {
    //   const [colKey, docKey, ...docPath] = path.split('.');
  
    //   result[colKey] = result[colKey] || {};
  
    //   let doc = result[colKey][docKey];
    //   if (!doc) {
    //     const unparsed = {
    //       _id: mongoose.Types.ObjectId(), // Always add ObjectId
    //       ...collections[colKey].base, // E.g. user base object in data file
    //       ...collections[colKey].documents[docKey],
    //     };
  
    //     // Set twice to handle circular dependencies
    //     result[colKey][docKey] = unparsed;
    //     doc = parse(unparsed);
    //     result[colKey][docKey] = doc;
    //   }
  
    //   const value = _.get(doc, docPath.join('.'));
    //   if (_.isUndefined(value)) {
    //     throw new Error(`Value undefined at path "${path}"`);
    //   }
    //   return value;
    // }
  }
  
  export async function createAll() {
    const cols = _.mapValues(collections, (value: any) => {
      return _.mapValues(value.documents, () => true);
    });
  
    await create(cols);
  }
  
  function transformItem(data: any) {
    if (!_.isArray(data)) {
      data = [data];
    }
  
    return data.reduce((result: any, item: any) => {
      if (_.isString(item)) {
        result[item] = {};
        return result;
      }
  
      if (_.isPlainObject(item)) {
        for (const key of Object.keys(item)) {
          const hasOverrides = _.isPlainObject(item[key]);
          result[key] = hasOverrides ? item[key] : {};
        }
        return result;
      }
  
      throw new Error(`Invalid create item`);
    }, {});
  }
  

