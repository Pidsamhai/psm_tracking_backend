import { Response } from "@netlify/functions/dist/function/response";
import { ResponseData, ResponseMessage } from "../type";

export function success(status: number = 200, message: string): Response {
    return {
        statusCode: status,
        body: JSON.stringify({status, message}),
    }
}

export function successEmpty(status: number = 200): Response {
    return {
        statusCode: status,
    }
}

export function successData(arg: ResponseData): Response {
    return {
        statusCode: arg.status ?? 200,
        body: JSON.stringify({status: arg.status ?? 200, data: arg.data}),
    }
}

export function error(arg: ResponseMessage): Response {
    return {
        statusCode: arg.status ?? 400,
        body: JSON.stringify({status: arg.status ?? 400, message: arg.message})
    }
}

export function errorEmpty(status: number = 400): Response {
    return {
        statusCode: status,
    }
}