'use server';

import axios from 'axios';
import { Dawn } from '@/types/models';
import { revalidatePath } from 'next/cache';
import { HttpsProxyAgent } from 'https-proxy-agent';
import DawnSchema from '@/libs/Mongoose/schemas/dawnSchema';

export const createDawn = async (data: Dawn) => {
  try {
    const dawnCreated = await DawnSchema.create(data);
    return JSON.stringify(dawnCreated);
  } catch (error: unknown) {
    console.error('error::createDawn::', error);
  }
};

export const getDawns = async () => {
  try {
    const dawns: Dawn[] = await DawnSchema.find({});
    return JSON.stringify(dawns);
  } catch (error: unknown) {
    console.error('error::getDawns::', error);
    return JSON.stringify([]);
  }
};

export const updateDawn = async (id: string, data: Dawn) => {
  try {
    const dawnUpdated = await DawnSchema.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    return dawnUpdated;
  } catch (error: unknown) {
    console.error('Error::', error);
  }
};

export const refreshDawns = async (
  id: string,
  token: string,
  proxy: string,
  appId: string,
) => {
  const agent = new HttpsProxyAgent(proxy);
  try {
    const res = await axios.get(
      `https://www.aeropres.in/api/atom/v1/userreferral/getpoint?appid=${appId}`,
      {
        headers: {
          Authorization: 'Berear'.concat(' ', token),
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
        },
        httpAgent: agent,
        httpsAgent: agent,
        timeout: 30000,
      },
    );

    if (!res.data?.data) {
      return JSON.stringify({
        error: true,
      });
    }

    const data = res.data?.data;

    const points = {
      refferalPoints: data?.referralPoint?.commission ?? 0,
      points: data?.rewardPoint?.points ?? 0,
      registerPoints: data?.rewardPoint?.registerpoints ?? 0,
      signinPoints: data?.rewardPoint?.signinpoints ?? 0,
      twitterPoints: data?.rewardPoint?.twitter_x_id_points ?? 0,
      discordPoints: data?.rewardPoint?.discordid_points ?? 0,
      telegramPoints: data?.rewardPoint?.telegramid_points ?? 0,
      bonusPoints: data?.rewardPoint?.bonus_points ?? 0,
      epoch01Points: data?.rewardPoint?.epoch01 ?? 0,
    };

    const totalPoints = Object.values(points).reduce((total, currentPoint) => {
      return (total += currentPoint);
    }, 0);

    const payload: Dawn = {
      ...points,
      totalPoints: totalPoints,
    };
    const dawnUpdated = await updateDawn(id, payload);
    revalidatePath('/dawn');
    return JSON.stringify({
      status: 200,
      message: 'Update Dawn Success',
      data: dawnUpdated,
    });
  } catch (error: unknown) {
    console.error('Error::refreshDawns::', error);
    return JSON.stringify({
      status: error.response.status,
      message: error.message,
      data: null,
    });
  }
};

export const createMultiDawn = async (data: Array<Dawn>) => {
  try {
    // Lấy danh sách email từ dữ liệu chèn
    const emails = data.map((field) => field.email);

    // Tìm các email đã tồn tại trong cơ sở dữ liệu
    const existingUsers = await DawnSchema.find({ email: { $in: emails } });
    const existingEmails = existingUsers.map((user) => user.email);

    // Loại bỏ những tài liệu có email trùng
    const uniqueUsers = data.filter(
      (field) => !existingEmails.includes(field.email),
    );

    const dawnsCreated = await DawnSchema.insertMany(uniqueUsers);
    revalidatePath('/dawn');
    return JSON.stringify(dawnsCreated);
  } catch (error: unknown) {
    console.error('error::createMultiDawn::', error);
  }
};

export const getTotalPoints = async () => {
  try {
    const sumPoints: Array<{ _id: null; total: number }> =
      await DawnSchema.aggregate([
        { $unwind: '$totalPoints' },
        {
          $group: { _id: null, total: { $sum: '$totalPoints' } },
        },
      ]);

    if (sumPoints && sumPoints.length > 0) {
      return sumPoints[0].total;
    }

    return 0;
  } catch (error: unknown) {
    console.error('error::getTotalPoints::', error);
  }
};
