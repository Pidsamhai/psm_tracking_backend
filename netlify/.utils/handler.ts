import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Response } from "@netlify/functions/dist/function/response";
import parser from "./parser";
import getAjv from "./getAjv";
import { HandlerOptions, Body } from "../type";

const handler: any = async (
  event: HandlerEvent,
  context: HandlerContext,
  options: HandlerOptions,
  callback: (body: Body) => Promise<Response> | Response
) => {
  const body = parser(event);
  for (const interceptor of options.interceptors) {
    const result = await interceptor(event, context);
    if (result != undefined) {
      return result;
    }
  }
  if (options.bodyScheme) {
    const ajv = getAjv();
    const validate = ajv.compile(options.bodyScheme);
    const valid = validate(body);
    if (!valid) {
      return <Response>{
        statusCode: 422,
        body: JSON.stringify({
          status: 422,
          message: validate.errors,
        }),
      };
    }
  }
  if (event.httpMethod == "OPTIONS") {
    return {
      statusCode: 200,
    };
  }
  return await callback(body);
};

export default handler;
