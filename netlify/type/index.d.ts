import { Interceptor } from ".";

interface Body {
  [key: string]: any;
}

interface HandlerOptions {
  acceptContents: string[];
  acceptMethod: string[];
  interceptors: Interceptor[];
  bodyScheme: any,
}

interface ResponseMessage {
  status: number;
  message?: string;
}

interface ResponseMessage {
  status?: number;
  message?: string;
}

interface ResponseData {
  status?: number;
  data?: any;
}
