class BadRequestError extends Error{
  statusCode: number;
  constructor(message: string){
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class NotFoundError extends Error{
  statusCode: number;
  constructor(message: string){
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ServerError extends Error{
  statusCode: number;
  constructor(message: string){
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}
class ConflictError extends Error{
  statusCode: number;
  constructor(message: string){
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

class FailedError extends Error{
  statusCode: number;
  constructor(message: string){
    super(message);
    this.name = "FailedError";
    this.statusCode = 400;
  }
}

export { BadRequestError, NotFoundError, ServerError, ConflictError, FailedError };