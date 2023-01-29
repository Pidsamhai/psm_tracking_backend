import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import cors from "../.utils/handler";
import db from "../.utils/db";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return await cors(event, context, async () => {
    return {
      statusCode: 200,
      body: JSON.stringify(await db.users.findMany()),
    };
  });
};
