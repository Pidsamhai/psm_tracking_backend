import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import requestHandler from "../.utils/handler";
import db from "../.utils/db";
import interceptor from "../.utils/interceptor";
import { signUpBodyScheme } from "../.utils/scheme";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { successData, error } from "../.utils/response";
import { Body, ResponseMessage } from "../type";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return await requestHandler(
    event,
    context,
    {
      interceptors: [interceptor],
      bodyScheme: signUpBodyScheme,
    },
    async (body: Body) => {
      const existUser = await db.users.findFirst({
        where: {
          email: body.email,
        }
      });
      if(existUser) {
        return error({
          message: "Email account has been used",
        });
      }
      const user = await db.users.create({
        data: {
          id: uuid(),
          name: body.name,
          email: body.email,
          password: bcrypt.hashSync(body.password, 10),
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    }
  );
};
