import { http_code_type } from "../../types/constantTypes";

export const HTTP_CODE: http_code_type = {
  SUCCESS: true,
  FAILED: false,
  SUCCESS_CODE: 200,
  SERVER_ERROR_CODE: 500,
  NOT_FOUND_CODE: 404,
  BAD_REQUEST_CODE: 400,
  RESOURCE_CREATED_CODE: 201,
  UNAUTHORIZED_CODE: 401,
  PROCESSING_CODE: 202,
  CONFLICT_CODE: 409,
  TOO_MANY_REQUEST_CODE: 429,
  PAYMENT_REQUIRED_CODE: 402,
  UNPROCESSABLE_ENTITY: 422,
  UNSUPPORTED_MEDIA_TYPE: 415,
  USE_PROXY: 305,
  PROCESSING: 102,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  REQUEST_TIMEOUT: 408,
  REQUEST_TOO_LONG: 413,
  REQUEST_URI_TOO_LONG: 414,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  RESET_CONTENT: 205,
  SEE_OTHER: 303,
  SERVICE_UNAVAILABLE: 503,
  SWITCHING_PROTOCOLS: 101,
  TEMPORARY_REDIRECT: 307,
  LENGTH_REQUIRED: 411,
  LOCKED: 423,
  METHOD_FAILURE: 420,
  METHOD_NOT_ALLOWED: 405,
  MOVED_PERMANENTLY: 301,
  MOVED_TEMPORARILY: 302,
  MULTI_STATUS: 207,
  MULTIPLE_CHOICES: 300,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};