import addFormats from "ajv-formats";
import { Validator, ValidationError } from "express-json-validator-middleware";
import { ErrorRequestHandler } from "express";

const validator = new Validator({});

addFormats(validator.ajv, ["date-time"])
  .addKeyword("Kind")
  .addKeyword("modifier");

export const validate = validator.validate;

export const validationErrorMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof ValidationError) {
    //Unprocessable Entity
    response.status(422).send({
      errors: error.validationErrors,
    });

    next();
  } else {
    next(error);
  }
};

export * from "./planet";
