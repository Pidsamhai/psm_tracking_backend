import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { Response } from "@netlify/functions/dist/function/response";

export type Interceptor = (event:HandlerEvent,context: HandlerContext) => void | Promise<void | Response> | Response;