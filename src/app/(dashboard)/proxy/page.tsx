import { ImportExcelModal, Table } from '@/components/ui/proxy';
import { getProxies } from '@/services/proxySvc';
import { Proxy } from '@/types/models';

export default async function page() {
  const res = await getProxies();
  const proxies = JSON.parse(res) as Proxy[];
  return (
    <div className="flex flex-col items-stretch justify-start gap-6">
      <div className="flex items-center justify-end gap-3">
        <ImportExcelModal />
        <button className="btn btn-accent">Export Excel</button>
      </div>
      <Table dataSource={proxies} />
    </div>
  );
}
