export{}; // make the file to module manually

declare global {
  namespace Express {
    export interface Request {
        user?: any
    }
  }
}
