'use client';

import { EMAIL_STATUS } from '@/types/enums';
import { Dawn } from '@/types/models';
import dayjs from 'dayjs';

export default function Table({ dataSource }: { dataSource: Dawn[] }) {
  const renderStatus = (status: EMAIL_STATUS) => {
    switch (status) {
      case EMAIL_STATUS.REGISTERED:
        return <span className="text-blue-500 font-semibold">Registered</span>;

      case EMAIL_STATUS.VERIFIED:
        return <span className="text-green-500 font-semibold">Verified</span>;

      case EMAIL_STATUS.NOT_EXIST:
        return (
          <span className="text-neutral-500 font-semibold">Not Exist</span>
        );

      case EMAIL_STATUS.ERROR:
        return <span className="text-red-500 font-semibold">Error</span>;

      case EMAIL_STATUS.NOT_REGISTERED:
      default:
        return (
          <span className="text-slate-500 font-semibold">Not Registered</span>
        );
    }
  };

  return (
    <div className="h-[720px] overflow-x-auto">
      <table className="table table-zebra table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td></td>
            <td>App Id</td>
            <td>Email</td>
            <td>Ngày cập nhật</td>
            <td>Points</td>
            <td>Register Points</td>
            <td>Signin Points</td>
            <td>Twitter Points</td>
            <td>Discord Points</td>
            <td>Telegram Points</td>
            <td>Bonus Points</td>
            <td>Epoch01 Points</td>
            <td>Refferal Points</td>
            <td>Total Points</td>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((dawn: Dawn, index: number) => (
            <tr key={dawn._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>{index + 1}</td>
              <td>{dawn.appId}</td>
              <td>{dawn.email}</td>
              <td className="text-center">
                {dayjs(dawn.updatedAt).format('hh:mm DD/MM/YYYY')}
              </td>
              <td>{dawn.points}</td>
              <td>{dawn.registerPoints}</td>
              <td>{dawn.signinPoints}</td>
              <td>{dawn.twitterPoints}</td>
              <td>{dawn.discordPoints}</td>
              <td>{dawn.telegramPoints}</td>
              <td>{dawn.bonusPoints}</td>
              <td>{dawn.epoch01Points}</td>
              <td>{dawn.refferalPoints}</td>
              <td>{dawn.totalPoints}</td>
              <th>
                {renderStatus(dawn.status ?? EMAIL_STATUS.NOT_REGISTERED)}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
