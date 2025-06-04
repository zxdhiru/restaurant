import jwt from "jsonwebtoken";
import config from "../../config";

// generate access token and refresh token
export function generateAuthToken(
  userId: string,
  username: string
): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign({ id: userId, username: username }, config.accessTokenSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId, username: username }, config.refreshTokenSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}
