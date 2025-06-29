import { useEffect, useState } from "react";
import { getUserApi, deleteUserApi } from "../../api/ApiHandler";

// Define a User type for type safety
interface User {
  _id: string;
  firstName?: string;
  name?: string;
  email: string;
  role?: string;
  isActive?: boolean;
}

function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        // Adjust the API endpoint as needed
        const res = await getUserApi();
        setUsers(res.data.users || []);
      }finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {   
      try {
        setLoading(true);
        setError("");
        await deleteUserApi(userId);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        setError("Failed to delete user");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Admin Dashboard - Users
        </h1>
        {loading ? (
          <div className="text-center text-lg text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">#</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Role</th>
                  <th className="py-2 px-4 border-b text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-gray-400"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr
                      key={user._id}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="py-2 px-4 border-b">{idx + 1}</td>
                      <td className="py-2 px-4 border-b font-medium">
                        {user.firstName || user.name || "-"}
                      </td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b capitalize">
                        {user.role || "user"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {user.isActive === false ? (
                          <span className="text-red-500 font-semibold">
                            Inactive
                          </span>
                        ) : (
                          <button className="text-red-600 font-semibold cursor-pointer hover:underline"
                          onClick={()=>{handleDeleteUser(user._id)}}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;