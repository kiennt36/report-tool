'use client';

import { PROXY_STATUS } from '@/types/enums';
import { Proxy } from '@/types/models';
import dayjs from 'dayjs';

export default function Table({ dataSource }: { dataSource: Proxy[] }) {
  const renderStatus = (status: PROXY_STATUS) => {
    switch (status) {
      case PROXY_STATUS.ACTIVE:
        return <span className="text-green-500 font-semibold">Active</span>;

      case PROXY_STATUS.ERROR:
        return <span className="text-red-500 font-semibold">Error</span>;

      case PROXY_STATUS.INACTIVE:
      default:
        return <span className="text-gray-500 font-semibold">Inactive</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td></td>
            <td>Ip Address</td>
            <td>Ngày cập nhật</td>
            <td>Version</td>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((proxy: Proxy, index: number) => (
            <tr key={proxy._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>{index + 1}</td>
              <td>{proxy.ipAddress}</td>
              <td className="text-center">
                {dayjs(proxy.updatedAt).format('hh:mm DD/MM/YYYY')}
              </td>
              <td>{proxy.v}</td>
              <th>{renderStatus(proxy.status ?? PROXY_STATUS.INACTIVE)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
