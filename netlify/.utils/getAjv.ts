import Ajv from "ajv";
import addFormats from "ajv-formats"

function getAjv(): Ajv {
  const ajv = new Ajv();
  addFormats(ajv);
  return ajv;
}

export default getAjv;
