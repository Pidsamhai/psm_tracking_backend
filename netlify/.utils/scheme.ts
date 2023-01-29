const signUpBodyScheme = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    name: { type: "string" },
  },
  required: ["email", "password", "name"],
  additionalProperties: false,
};

const signInBodyScheme = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export { signUpBodyScheme, signInBodyScheme };
