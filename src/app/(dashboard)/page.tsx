import { getTotalPoints } from '@/services/dawnSvc';
import Link from 'next/link';

export default async function page() {
  const totalDawnPoints = await getTotalPoints();
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="w-full card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Dawn</h2>
            <p>
              Tổng sản lượng: {totalDawnPoints?.toLocaleString('vi-VN')} points
            </p>
            <div className="card-actions justify-end">
              <Link href="/dawn">
                <button className="btn btn-primary">Xem chi tiết</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
