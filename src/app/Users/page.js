// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [editingUser, setEditingUser] = useState(null); // لتتبع التحديث

//   // 🟢 تحميل المستخدمين النشطين
//   useEffect(() => {
//     axios.get("/api/Users").then((res) => setUsers(res.data));
//   }, []);

//   // 🟢 إضافة مستخدم جديد
//   const addUser = async () => {
//     if (!name || !email) return alert("Please fill all fields");
//     const res = await axios.post("/api/Users", { name, email });
//     setUsers([...users, res.data]);
//     setName("");
//     setEmail("");
//   };

//   // 🟢 تحديث بيانات المستخدم
//   const updateUser = async () => {
//     if (!editingUser || !name || !email) return alert("Please fill all fields");
//     const res = await axios.patch("/api/Users", {
//       id: editingUser._id,
//       name,
//       email,
//     });
//     setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)));
//     setEditingUser(null);
//     setName("");
//     setEmail("");
//   };

//   // 🟢 حذف ناعم للمستخدم
//   const softDeleteUser = async (id) => {
//     await axios.delete("/api/Users", { data: { id } });
//     setUsers(users.filter((user) => user._id !== id));
//   };

//   // 🟢 استعادة المستخدم
//   const restoreUser = async (id) => {
//     await axios.put("/api/Users", { id });
//     axios.get("/api/users").then((res) => setUsers(res.data)); // إعادة تحميل المستخدمين
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Users</h1>

//       {/* 🟢 Form لإضافة أو تعديل المستخدم */}
//       <div className="flex gap-2 mb-4">
//         <input
//           className="border p-2 w-full"
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           className="border p-2 w-full"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {editingUser ? (
//           <button
//             className="bg-yellow-500 text-white px-4 py-2"
//             onClick={updateUser}
//           >
//             Update
//           </button>
//         ) : (
//           <button
//             className="bg-blue-500 text-white px-4 py-2"
//             onClick={addUser}
//           >
//             Add
//           </button>
//         )}
//       </div>

//       {/* 🟢 قائمة المستخدمين */}
//       <ul className="space-y-2">
//         {users.map((user) => (
//           <li
//             key={user._id}
//             className="flex justify-between p-2 border rounded"
//           >
//             <span>
//               {user.name} ({user.email})
//             </span>
//             <div className="flex gap-2">
//               <button
//                 className="bg-green-500 text-white px-2 py-1"
//                 onClick={() => {
//                   setEditingUser(user);
//                   setName(user.name);
//                   setEmail(user.email);
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white px-2 py-1"
//                 onClick={() => softDeleteUser(user._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* 🟢 المستخدمون المحذوفون (لإمكانية الاستعادة) */}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { User, Edit, Trash2, Plus, RefreshCw } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get("/api/Users").then((res) => setUsers(res.data));
  }, []);

  const addUser = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("/api/Users", { name, email });
      setUsers([...users, res.data]);
      setName("");
      setEmail("");
    } catch (error) {
      alert("Error adding user");
    }
  };

  const updateUser = async () => {
    if (!editingUser || !name || !email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.patch("/api/Users", {
        id: editingUser._id,
        name,
        email,
      });
      setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)));
      setEditingUser(null);
      setName("");
      setEmail("");
    } catch (error) {
      alert("Error updating user");
    }
  };

  const softDeleteUser = async (id) => {
    try {
      await axios.delete("/api/Users", { data: { id } });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const restoreUser = async (id) => {
    try {
      await axios.put("/api/Users", { id });
      const res = await axios.get("/api/Users");
      setUsers(res.data);
    } catch (error) {
      alert("Error restoring user");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <User className="w-8 h-8" /> User Management
          </h1>
        </div>

        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                type="text"
                placeholder="Enter user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                type="email"
                placeholder="Enter user email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              {editingUser ? (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-300"
                  onClick={updateUser}
                >
                  <RefreshCw className="w-5 h-5" /> Update
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-300"
                  onClick={addUser}
                >
                  <Plus className="w-5 h-5" /> Add User
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              User List
            </h2>
            {users.length === 0 ? (
              <p className="text-center text-gray-500">No users found</p>
            ) : (
              <ul className="space-y-3">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-green-500 hover:bg-green-50 p-2 rounded-full transition"
                        onClick={() => {
                          setEditingUser(user);
                          setName(user.name);
                          setEmail(user.email);
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                        onClick={() => softDeleteUser(user._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
