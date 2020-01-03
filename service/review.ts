import {ReviewModel} from '../models/review';

export async function randomList(filter={}, size: Number) {
  try {
    return await ReviewModel.aggregate([{$match: filter}, {$sample: {size: size}}]);
  } catch(err) {
    throw err;
  }
}

export async function list(target= {}) {
  try {
    return await ReviewModel.find(target);
  } catch (err) {
    throw err;
  }
}

export async function deleteOne(target= {}) {
  if(target === {}) {
    return;
  }
  try {
    return await ReviewModel.deleteOne(target);
  } catch (err) {
    throw err;
  }
}

export async function update(target: object, updateTo: object) {
  try {
    return await ReviewModel.updateMany(target, updateTo );
    // ReviewModel.update(target, {$set: updateTo} ); in mongoDB
  }
  catch (err) {
    throw err;
  }
}
