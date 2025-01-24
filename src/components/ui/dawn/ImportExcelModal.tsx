'use client';

import * as XLSX from 'xlsx';
import { ChangeEventHandler, useRef, useState } from 'react';
import { Dawn } from '@/types/models';
import { createMultiDawn } from '@/services/dawnSvc';
import { EMAIL_STATUS } from '@/types/enums';

export default function ImportExcelModal() {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputEl = event.target;

    const file = inputEl.files?.[0];

    if (!file) {
      alert('Không tìm thấy file!');
      return;
    }

    setFile(file);
  };

  const handleConfirm = () => {
    setLoading(true);
    if (!file) {
      alert('Không tìm thấy file!');
      setLoading(false);
      return;
    }

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target?.result) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          // Lấy tên sheet đầu tiên
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Chuyển đổi dữ liệu từ sheet thành JSON
          const jsonData: Array<Array<string>> = XLSX.utils.sheet_to_json(
            worksheet,
            { header: 1 },
          );

          const keys = jsonData[1];
          const values = jsonData.slice(2);

          const dawns: Array<Dawn> = [];

          values.forEach((value: Array<string>) => {
            if (value.length > 0) {
              const row = Object.fromEntries(
                keys.map((key, index) => [key, value[index]]),
              );
              dawns.push(row);
            }
          });

          const payload: Dawn[] = dawns.map((dawn) => ({
            ...dawn,
            status: dawn.status
              ? EMAIL_STATUS[
                  dawn.status as unknown as keyof typeof EMAIL_STATUS
                ]
              : EMAIL_STATUS.NOT_REGISTERED,
          }));
          const res = await createMultiDawn(payload);

          const dataParseJson = JSON.parse(res ?? '[]');

          const message =
            dataParseJson.length > 0
              ? 'Import Excel Success!'
              : 'Import excel fail!';
          alert(message);
        }
      };

      // Đọc file dưới dạng binary string
      reader.readAsArrayBuffer(file);
    } catch (error: any) {
      console.log('error::', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Import Excel
      </button>
      <dialog id="import-excel-modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Import Excel</h3>
          <p className="py-4">
            Nếu chưa có file mẫu, tải{' '}
            <a
              href="/files/Import dawn - File mẫu.xlsx"
              target="_blank"
              className="text-blue-500 underline"
            >
              file mẫu
            </a>
          </p>
          <input
            name="file"
            type="file"
            multiple={false}
            accept=".xlsx,.xls"
            className="file-input file-input-bordered w-full max-w-xl"
            onChange={handleFileChange}
          />
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : null}
              Xác nhận
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
