import mongoose from 'mongoose';

interface Rating {
  taste: number | string;
  quantity: number | string;
  atmosphere: number | string;
  service: number | string;
  price: number | string;
  total: number | string;
}

export interface Review extends mongoose.Document {
  reviewId: mongoose.Types.ObjectId;
  postURL: string;
  name: string;
  region?: string;
  foodtype?: string;
  content: string;
  likeNum: number;
  commentNum: number;
  imgUrls: string[];
  rating: Rating;
  location: any;
}
// model의 type 진단을 위함

const schema = new mongoose.Schema({
  reviewId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  postURL: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  region: {
    type: Array
  },
  foodtype: {
    type: Array
  },
  content: {
    required: true,
    type: String
  },
  likeNum: {
    required: true,
    type: Number
  },
  commentNum: {
    required: true,
    type: Number
  },
  imgUrls: {
    required: true,
    type: Array
  },
  rating: {
    default: {taste: "0"},
    type: Object
  },
  location: {
    default: {},
    type: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    }
  }
});
// 실제 model schema

export const ReviewModel = mongoose.model<Review>('Review', schema);
