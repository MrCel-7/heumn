import { useEffect, useState } from "react";
import { formatRupiah } from "../utils/formatRupiah";
import { FaBagShopping, FaCalendar, FaTag } from "react-icons/fa6";
import { FaWeight } from "react-icons/fa";
import { formatNumber } from "../utils/formatNumber";
import Sidebar from "../components/Sidebar";

export default function pendingPO() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("customer");

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null);

  const [form, setForm] = useState({
    id: "",
    sales: "",
    customer: "",
    poNumber: "",
    product: "",
    qty: "",
    price: "",
    deliveryDate: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("poData")) || [];
    setData(saved);
  }, []);

  const saveData = () => {
    let updated;

    if (form.id) {
      updated = data.map((item) => (item.id === form.id ? form : item));
    } else {
      updated = [...data, { ...form, id: Date.now() }];
    }

    localStorage.setItem("poData", JSON.stringify(updated));
    setData(updated);

    setShowForm(false);

    setForm({
      id: "",
      sales: "",
      customer: "",
      poNumber: "",
      product: "",
      qty: "",
      price: "",
      deliveryDate: "",
    });
  };

  const deleteData = (id) => {
    const updated = data.filter((item) => item.id !== id);
    localStorage.setItem("poData", JSON.stringify(updated));
    setData(updated);
    setShowDetail(null);
  };

  const filteredData = data.filter((item) =>
    item[searchBy].toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col ml-50 p-8 w-full">
        <div className="flex gap-5 mb-4">
          <input
            type="text"
            className="bg-gray-100 focus:outline-0 rounded-full py-2 px-4 shadow-inner"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="py-2 px-4 bg-gray-100 shadow-inner rounded-full">
            <select
              className="focus:outline-0"
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="sales">Sales</option>
              <option value="poNumber">Nomor PO</option>
            </select>
          </div>

          <button
            className="bg-green-500 focus:outline-0 rounded-xl shadow-xl cursor-pointer hover:bg-green-600 font-bold text-white px-4"
            onClick={() => setShowForm(true)}
          >
            Add PO
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border">No.</th>
              <th className="border">Nama Customer</th>
              <th className="border">Nomor PO</th>
              <th className="border">Sales</th>
              <th className="border">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="border text-center">{index + 1}</td>
                <td className="border text-center">{item.customer}</td>
                <td className="border text-center">{item.poNumber}</td>
                <td className="border text-center">{item.sales}</td>
                <td
                  className="border text-center"
                  onClick={() => setShowDetail(item)}
                >
                  <p>⋮</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <div className="bg-white p-5 rounded w-500">
              <input
                placeholder="Sales"
                className="border p-2 w-full mb-2"
                value={form.sales}
                onChange={(e) => setForm({ ...form, sales: e.target.value })}
              />

              <input
                placeholder="Customer"
                className="border p-2 w-full mb-2"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
              />

              <input
                placeholder="Nomor PO"
                className="border p-2 w-full mb-2"
                value={form.poNumber}
                onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
              />

              <input
                placeholder="Nama Barang"
                className="border p-2 w-full mb-2"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
              />

              <input
                type="number"
                placeholder="Qty"
                className="border p-2 w-full mb-2"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
              />

              <input
                type="number"
                placeholder="Harga"
                className="border p-2 w-full mb-2"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                type="date"
                className="border p-2 w-full mb-2"
                value={form.deliveryDate}
                onChange={(e) =>
                  setForm({ ...form, deliveryDate: e.target.value })
                }
              />

              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={saveData}
              >
                Save
              </button>
              <button
                className="bg-orange-300 text-white px-4 py-2"
                onClick={() => setShowForm(false)}
              >
                {" "}
                Close
              </button>
            </div>
          </div>
        )}

        {/* DETAIL */}
        {showDetail && (
          <div className="flex flex-col top-0 left-0 w-full h-screen absolute items-center justify-center">
            <div className="shadow-xl bg-white inset-0 h-fit mx-50 flex justify-center items-center w-170">
              <div className="bg-white w-fit h-fit p-5 rounded">
                <div className="flex items-end gap-5">
                  <p className="text-3xl font-bold text-blue-800">
                    {showDetail.customer}
                  </p>
                  <p className="border rounded-xl py-1 px-2">
                    {showDetail.poNumber}
                  </p>
                </div>
                <div className="flex gap-5 justify-between mt-5">
                  <div className="flex gap-5 items-center flex-2 py-1 px-5 rounded-xl shadow-inner bg-gray-100">
                    <FaBagShopping className="text-blue-800" />
                    <p>{showDetail.product}</p>
                  </div>
                  <div className="flex gap-5 items-center flex-1 py-1 px-5 rounded-xl shadow-inner bg-gray-100">
                    <div className="w-full flex items-center gap-5">
                      <FaWeight className="text-blue-800" />
                      <p>{formatNumber(showDetail.qty)}</p>
                    </div>
                    <p>Kg</p>
                  </div>
                  <div className="flex gap-5 items-center flex-1 py-1 px-5 rounded-xl shadow-inner bg-gray-100">
                    <FaTag className="text-blue-800" />
                    <p className="text-end w-full">
                      {formatRupiah(showDetail.price)}
                    </p>
                  </div>
                </div>

                <div className="flex my-2 flex-col items-end w-full">
                  <div className="flex">
                    <p>Total :</p>
                    <p className="w-30 text-end">
                      {formatRupiah(showDetail.qty * showDetail.price)}
                    </p>
                  </div>
                  <div className="flex">
                    <p>Ppn 11% :</p>
                    <p className="w-30 text-end">
                      {formatRupiah(showDetail.qty * showDetail.price * 0.11)}
                    </p>
                  </div>
                  <div className="flex">
                    <p>Grand Total :</p>
                    <p className="w-30 text-end">
                      {formatRupiah(showDetail.qty * showDetail.price * 1.11)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-center w-fit py-1 px-5 rounded-xl shadow-inner bg-gray-100">
                  <FaCalendar className="text-blue-800" />
                  <p>{showDetail.deliveryDate}</p>
                </div>

                <div className="flex gap-2 mt-4 w-full justify-end">
                  <button
                    className="bg-yellow-300 rounded-full w-25 cursor-pointer hover:bg-yellow-400 text-white px-4 py-1"
                    onClick={() => {
                      setForm(showDetail);
                      setShowForm(true);
                      setShowDetail(null);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-400 rounded-full w-25 cursor-pointer hover:bg-red-500 px-4 py-1 text-white"
                    onClick={() => deleteData(showDetail.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-orange-300 rounded-full w-25 cursor-pointer hover:bg-orange-400 px-4 py-1 text-white"
                    onClick={() => setShowDetail(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
