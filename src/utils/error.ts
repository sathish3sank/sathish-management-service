import * as t from "io-ts";

export type ErrorType =
  | "Domain Rule"
  | "Bad Input"
  | "Couldn't connect"
  | "Invalid Input Value";

export interface BaseError {
  commonErrors: "__baseError__";
  message: string;
  _raw?: string;
  status?: string;
}

const commonErrors = t.union([
  t.literal("Couldn't connect"),
  t.literal("Invalid Input"),
  t.literal("Domain Rule"),
]);

export type CommonErrorsType = t.TypeOf<typeof commonErrors>;

export interface BrandErrorTypeT<ErrorTypeT extends ErrorType> {
  type: ErrorTypeT;
}

export interface BrandErrorTags<ErrorTags extends string> {
  tag: ErrorTags;
}

export type Err<Tags extends string, Types extends ErrorType> = BaseError &
  BrandErrorTags<Tags> &
  BrandErrorTypeT<Types>;

const makeError = <Tags extends string, Types extends ErrorType>(
  type: Types,
  tag: Tags
) => (message: string, _raw?: string): Err<Tags, Types> => {
  return {
    commonErrors: "__baseError__",
    message: message,
    _raw: _raw ? _raw : message,
    tag,
    type,
  };
};

export const makeBadInputError = makeError(
  "Bad Input",
  "Invalid input provided"
);

export const makeDomainRuleError = makeError("Domain Rule", "Bad Rules");

export const makeConnectionError = makeError(
  "Couldn't connect",
  "Connection failed"
);

export const makeUndefinedError = makeError(
  "Invalid Input Value",
  "Could not read input values"
);
