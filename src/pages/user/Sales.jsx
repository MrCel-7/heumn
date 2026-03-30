import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaEnvelope, FaPhoneAlt, FaUserAlt } from "react-icons/fa";

export default function Sales() {
  const [data, setData] = useState([]);
  const [showSales, setShowSales] = useState(false);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const [phone, setPhone] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sales")) || [];
    setData(saved);
  }, []);

  const saveData = () => {
    let updated;

    if (form.id) {
      updated = data.map((item) => (item.id === form.id ? form : item));
    } else {
      updated = [...data, { ...form, id: Date.now() }];
    }

    localStorage.setItem("sales", JSON.stringify(updated));
    setData(updated);

    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const formatPhone = (value) => {
    let cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 4 && cleaned.length <= 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    } else if (cleaned.length > 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
    }

    return cleaned;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 13) return;

    setForm({ ...form, phone: formatted });
  };

  const deleteData = (id) => {
    const updated = data.filter((item) => item.id !== id);
    localStorage.setItem("sales", JSON.stringify(updated));
    setData(updated);
  };

  const editData = (item) => {
    setForm(item);
    setShowSales(true);
  };

  const filteredData = data.filter((item) =>
    item[searchBy].toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex flex-col ml-50 gap-5 p-8 w-full">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 focus:outline-0 rounded-full py-2 px-4 shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="px-4 py-2 bg-gray-100 focus:outline-0 rounded-full shadow-inner">
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="focus:outline-0 bg-transparent pr-5"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <button
            onClick={() => setShowSales(true)}
            className="bg-green-400 w-fit py-1 rounded-xl cursor-pointer hover:bg-green-500 shadow-xl font-bold text-white px-4"
          >
            Add Sales
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border">No.</th>
              <th className="border">Name</th>
              <th className="border">Email</th>
              <th className="border">Phone</th>
              <th className="border">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-3">{index + 1}</td>
                <td className="border px-3">{item.name}</td>
                <td className="border px-3">{item.email}</td>
                <td className="border px-3">{formatPhone(item.phone)}</td>
                <td className="border text-center">
                  <p>⋮</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSales && (
        <div className="absolute top-0 left-0 bg-black/40 w-full h-screen flex items-center justify-center">
          <div className="p-8 flex w-100 flex-col gap-3 bg-white rounded-xl">
            <h1 className="text-2xl font-bold">Form Sales</h1>
            <div className="flex gap-3 items-center py-1 px-4 bg-gray-100 shadow-inner rounded-xl">
              <FaUserAlt className="w-5 text-center text-blue-800" />
              <input
                type="text"
                placeholder="Name"
                className="w-full focus:outline-0 bg-transparent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex gap-3 items-center py-1 px-4 bg-gray-100 shadow-inner rounded-xl">
              <FaEnvelope className="w-5 text-center text-blue-800" />
              <input
                type="email"
                placeholder="Email"
                className="w-full focus:outline-0 bg-transparent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex gap-3 items-center py-1 px-4 bg-gray-100 shadow-inner rounded-xl">
              <FaPhoneAlt className="w-5 text-center text-blue-800" />
              <input
                type="text"
                placeholder="Phone"
                className="w-full focus:outline-0 bg-transparent"
                onChange={handlePhoneChange}
                value={formatPhone(form.phone)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveData}
                className="bg-green-400 flex-1 py-1 rounded-xl cursor-pointer hover:bg-green-500 shadow-xl font-bold text-white px-4"
              >
                Save
              </button>
              <button
                onClick={() => setShowSales(false)}
                className="bg-red-400 flex-1 py-1 rounded-xl cursor-pointer hover:bg-red-500 shadow-xl font-bold text-white px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
