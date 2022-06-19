import { base64url } from "jose";
import { TextDecoder } from "util";
import { InvalidInputError } from "./exceptions";

class Jwt {
  header: string;
  payload: string;

  constructor(header: string, payload: string) {
    this.header = JSON.parse(header);
    this.payload = JSON.parse(payload);
  }

  public static getJwt(jwt: string | null | undefined): Jwt | null {
    if (!jwt) {
      return null;
    }
    const textDecoder = new TextDecoder();
    const parts = jwt.split(".");
    if (parts.length < 2) {
      throw new InvalidInputError("Make sure your JWT has a valid format");
    }
    const [header, payload] = parts.map((part) =>
      textDecoder.decode(base64url.decode(part))
    );
    return new Jwt(header, payload);
  }
}

export default Jwt;
