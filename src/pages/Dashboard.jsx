import { useEffect, useState } from "react";
import { formatNumber } from "../utils/formatNumber";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("poData")) || [];
    setData(saved);
  }, []);

  const filteredData = data
    .filter((item) => item.deliveryDate === selectedDate)
    .sort((a, b) => a.sales.localeCompare(b.sales));

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="ml-50 p-8 w-full h-screen flex flex-col">
        <div className="flex gap-3 mb-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded"
            onClick={() => (window.location.href = "/pending")}
          >
            Add new PO
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border">No.</th>
              <th className="border">Nama Customer</th>
              <th className="border">Nama Barang</th>
              <th className="border">Qty Barang</th>
              <th className="border">Sales</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="border text-center">{index + 1}</td>
                <td className="border text-center">{item.customer}</td>
                <td className="border text-center">{item.product}</td>
                <td className="border text-center">
                  {formatNumber(item.qty)} Kg
                </td>
                <td className="border text-center">{item.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
