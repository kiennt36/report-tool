import { ImportExcelModal, RefreshBtn, Table } from '@/components/ui/dawn';
import { getDawns } from '@/services/dawnSvc';
import { Dawn } from '@/types/models';

export default async function DawnPage() {
  const res = await getDawns();
  const dawns = JSON.parse(res) as Dawn[];

  return (
    <div className="flex flex-col items-stretch justify-start gap-6">
      <div className="flex items-center justify-end gap-3">
        <ImportExcelModal />
        <button className="btn btn-accent">Export Excel</button>
        <RefreshBtn />
      </div>
      <Table dataSource={dawns} />
    </div>
  );
}
