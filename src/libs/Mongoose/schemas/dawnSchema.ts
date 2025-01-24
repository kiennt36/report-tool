'use server';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dawnSchema = new Schema(
  {
    appId: String,
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    registerPoints: {
      type: Number,
      default: 0,
    },
    signinPoints: {
      type: Number,
      default: 0,
    },
    twitterPoints: {
      type: Number,
      default: 0,
    },
    discordPoints: {
      type: Number,
      default: 0,
    },
    telegramPoints: {
      type: Number,
      default: 0,
    },
    bonusPoints: {
      type: Number,
      default: 0,
    },
    epoch01Points: {
      type: Number,
      default: 0,
    },
    refferalPoints: {
      type: Number,
      default: 0,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 4, 5],
      default: 0,
    },
    token: String,
  },
  { timestamps: true },
);

const DawnSchema = mongoose.models.Dawns || mongoose.model('Dawns', dawnSchema);
export default DawnSchema;
