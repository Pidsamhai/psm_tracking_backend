import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import requestHandler from "../.utils/handler";
import db from "../.utils/db";
import interceptor from "../.utils/interceptor";
import { signInBodyScheme } from "../.utils/scheme";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { successData, error } from "../.utils/response";
import { Body } from "../type";
import njwt, { base64urlEncode, JSONMap } from "njwt";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return await requestHandler(
    event,
    context,
    {
      interceptors: [interceptor],
      bodyScheme: signInBodyScheme,
    },
    async (body: Body) => {
      const existUser = await db.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (!existUser) {
        return error({
          message: "User not found",
        });
      }

      const valid = bcrypt.compareSync(body.password, existUser.password!);

      if (!valid) {
        return error({
          message: "Invalid password",
        });
      }

      const claims: JSONMap = {
        iss: "psm-tracking",
        sub: existUser.id,
        role: "authenticate",
        exp: Date.now(),
        iat:
          Date.now() +
          (process.env.TOKEN_EXPRIED
            ? Number.parseInt(process.env.TOKEN_EXPRIED!)
            : 1 * 60 * 60 * 1000),
        data: {
          id: existUser.id,
          email: existUser.email,
          name: existUser.name,
          createAt: existUser.createdAt.toISOString(),
        },
      };

      const token = njwt.create(claims, process.env.JWT_SECRET);

      return successData({
        data: {
          refresh_token: token.compact(),
          access_token: base64urlEncode(uuid()),
        },
      });
    }
  );
};
