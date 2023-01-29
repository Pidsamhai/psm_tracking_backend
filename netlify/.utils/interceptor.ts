import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import cors from "../.utils/handler";
import db from "../.utils/db";
import { Interceptor } from "../type/type";

const handler: Interceptor = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log(`[LOG][METHOD] ${event.httpMethod}`);
  console.log(`[LOG][BODY] ${event.body}`);
  return;
};

export default handler;
