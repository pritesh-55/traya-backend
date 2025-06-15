exports.submitHairTestSchema = {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        phoneNumber: {
          type: "string",
          pattern: "^[6-9]\\d{9}$",
          description: "Indian phone number without country code",
        },
        name: { type: "string", minLength: 2 },
        age: { type: "integer", minimum: 12, maximum: 100 },
        gender: { enum: ["male", "female", "other"] },
      },
      required: ["phoneNumber", "name"],
      additionalProperties: false,
    },
    hairData: {
      type: "object",
      properties: {
        hairLossStage: {
      enum: ["stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6"],
    },
    familyHistory: { enum: ["mother", "father", "both", "none"] },
    dandruff: { enum: ["no", "mild", "heavy", "psoriasis", "seborrheic"] },
    sleep: { enum: ["peaceful", "disturbed", "difficult"] },
    stress: { enum: ["none", "low", "moderate", "high"] },
    acidityOrGas: { type: "boolean" },
    energyLevels: { enum: ["high", "low", "very-low"] },
    takingSupplements: { type: "boolean" },
      },
      required: ["hairLossStage", "familyHistory", "dandruff", "sleep", "stress", "acidityOrGas", "energyLevels", "takingSupplements"],
    }
  },
  required: ["user", "hairData"],
  additionalProperties: false,
};

exports.placeOrderSchema = {
  type: "object",
  properties: {
    phoneNumber: {
      type: "string",
      pattern: "^[6-9]\\d{9}$",
      description: "Indian phone number without country code",
    },
    shipping: {
      type: "object",
      properties: {
        addressLine: { type: "string", minLength: 5 },
        city: { type: "string", minLength: 2 },
        state: { type: "string", minLength: 2 },
        zip: { type: "string", minLength: 3 },
        country: { type: "string", minLength: 2 },
      },
      required: ["addressLine", "city", "state", "zip", "country"],
    },
    billing: {
      type: "object",
      properties: {
        addressLine: { type: "string", minLength: 5 },
        city: { type: "string", minLength: 2 },
        state: { type: "string", minLength: 2 },
        zip: { type: "string", minLength: 3 },
        country: { type: "string", minLength: 2 },
      },
      required: ["addressLine", "city", "state", "zip", "country"],
    },
    paymentMethod: {
      enum: ["razorpay", "snapmint"],
    },
    couponCode: { type: "string" },
  },
  required: ["phoneNumber", "shipping", "billing", "paymentMethod"],
  additionalProperties: false,
};
