import jwt from 'jsonwebtoken';

const privateKey = "mypassword2kl";

// jwt
export const jwtSign = (obj: any): string => {
  return jwt.sign(obj, privateKey);
};

export const jwtVerify = (token: string): string | any => {
  return jwt.verify(token, privateKey);
};
