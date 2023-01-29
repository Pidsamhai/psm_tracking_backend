import { HandlerEvent } from "@netlify/functions";

const parser = (event: HandlerEvent): Body => {
  try {
    console.log(event.headers["content-type"]);
    if (event.headers["content-type"]) {
      return JSON.parse(event.body ?? "{}");
    }
    return <Body>{};
  } catch (error) {
    return <Body>{};
  }
};

export default parser;
