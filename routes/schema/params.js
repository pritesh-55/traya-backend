exports.reportPublicIdSchema = {
  type: 'object',
  properties: {
    publicId: {
      type: 'string',
      required: true,
    },
  },
  additionalProperties: false,
};

exports.orderNumberSchema = {
  type: 'object',
  properties: {
    orderNumber: {
      type: 'string',
      required: true,
    },
  },
  additionalProperties: false,
};