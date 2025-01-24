'use client';

import { refreshDawns } from '@/services/dawnSvc';

export default function RefreshBtn() {
  const handleRefresh = async () => {
    const res = await refreshDawns(
      '67917489fdd07adcae9ee4a1',
      '2056b72d0eb33beb2a6d2d39c67296afa677fc1f271efaf0d84b5d50cd08aee410c07f2f8a6510b58ab067551517964a9b712a207a15ea4f311b2b0364b0fd4b36f7dc1a6930c57d3f67aaefb33cbb9d357abf574666de45b4800fa8e20ada9ad4e6349b75b3b039d55372af82e3e14d46c2ae3dd1a109055042e87f2bd6b2f800232ab733b83a32bd85e4db0ab95278fb96ce42dbe30ef6a9dcbeb1c727aea25fb4be050685e1470256168b64a453da3c5f8761c6e2f0f3bfeb5f24e7c73c32691c90de998840b811e3acbb6e625889b258582248fb44020516835b3dac6d3e62e1aaa9de12f01d48c4275238bf8467',
      'http://user19878:A90B@fb6719.proxyfb.com:19878',
      '677d50b94294c406bf55258e',
    );
    const data = JSON.parse(res);

    alert(data?.status === 200 ? 'Cập nhập thành công!' : 'Cập nhập thất bại!');
  };

  return (
    <button className="btn" onClick={handleRefresh}>
      Refresh
    </button>
  );
}
