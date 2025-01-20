import { HTTPCode } from "../../http/libs/enums/enums";

type HTTPCodeType = (typeof HTTPCode)[keyof typeof HTTPCode];

type Constructor = {
  cause?: unknown;
  message: string;
  status: HTTPCodeType;
};

class HTTPError extends Error {
  public status: HTTPCodeType;

  public constructor({ cause, message, status }: Constructor) {
    super(message);

    this.cause = cause;
    this.status = status;
  }
}

export { HTTPError };
