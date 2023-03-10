/**
 * 错误编码，由5位数字组成，前2位为模块编码，后3位为业务编码
 * 如：10001（10代表系统模块，001代表业务代码）
 */
export class ErrorCode {
  INTERNAL_SERVER_ERROR = 500;
  UNAUTHORIZED = 401;
  FORBIDDEN = 403;

  NOT_NULL = 10001;
  DB_RECORD_EXISTS = 10002;
  PARAMS_GET_ERROR = 10003;
  ACCOUNT_PASSWORD_ERROR = 10004;
  ACCOUNT_DISABLE = 10005;
  IDENTIFIER_NOT_NULL = 10006;
  CAPTCHA_ERROR = 10007;
  SUB_MENU_EXIST = 10008;
  PASSWORD_ERROR = 10009;
  ACCOUNT_NOT_EXIST = 10010;
  ACCOUNT_EXIST = 10011;
}
