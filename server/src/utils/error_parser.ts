import { Result, ValidationError } from "express-validator";

function errorParser(errors:Result<ValidationError>): string {
    return errors.array().map((err) => err.msg).join("\n");
}

export { errorParser };