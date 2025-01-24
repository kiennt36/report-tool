'use server';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const proxySchema = new Schema(
  {
    ipAddress: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    v: { type: Number, enum: [4, 6] },
    status: { type: Number, enum: [0, 1, 2] },
  },
  { timestamps: true },
);

const ProxySchema = mongoose.model('Proxies', proxySchema);

export default ProxySchema;
