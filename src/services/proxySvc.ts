'use server';

import ProxySchema from '@/libs/Mongoose/schemas/proxySchema';
import { Proxy } from '@/types/models';
import { revalidatePath } from 'next/cache';

export const getProxies = async () => {
  try {
    const proxies: Proxy[] = await ProxySchema.find({});
    return JSON.stringify(proxies);
  } catch (error: any) {
    console.error('error::getProxies::', error.message);
    return JSON.stringify([]);
  }
};

export const createMultiProxy = async (data: Array<Proxy>) => {
  try {
    const proxiesCreated = await ProxySchema.insertMany(data);
    revalidatePath('/proxy');
    return JSON.stringify(proxiesCreated);
  } catch (error: any) {
    console.error('error::createMultiProxy::', error.message);
  }
};
