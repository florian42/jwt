import { decode } from "jose/util/base64url";
import { TextDecoder } from "util";
import { InputCannotBeEmptyError, InvalidInputError } from "./exceptions";

class Jwt {
  header: string;
  payload: string;

  constructor(header: string, payload: string) {
    this.header = JSON.parse(header);
    this.payload = JSON.parse(payload);
  }

  public static getJwt(jwt: string | null | undefined): Jwt {
    if (!jwt) {
      throw new InputCannotBeEmptyError("Forgot to paste your JWT?");
    }
    const textDecoder = new TextDecoder();
    const parts = jwt.split(".");
    if (parts.length < 2) {
      throw new InvalidInputError("Make sure your JWT has a valid format");
    }
    const [header, payload] = parts.map((part) =>
      textDecoder.decode(decode(part))
    );
    return new Jwt(header, payload);
  }
}

export default Jwt;
