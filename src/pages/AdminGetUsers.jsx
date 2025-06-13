import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useState } from "react";


export default function AdminGetUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
    {
      id: 2,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
    {
      id: 3,
      profile_image_url: null,
      name: "loading name...",
      email: "loading email...",
      role: "loading role...",
    },
  ]);
  const getAllUsers = useAuthStore(s => s.getAllUsers)

  useEffect(() => {
    getAllUsers().then(() => {
      const allUsers = useAuthStore.getState().allUsers
      setUsers(allUsers)
    })

  }, [])


  return (
    <div className="w-full max-w-3xl my-6 mx-auto p-2 box-border min-h-[80vh]">
      <h2 className="mb-6 font-[poppins-bold] text-2xl">User Overview</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--bg-tertiary)]">
              <th className="px-2 py-3 font-[poppins-medium]">Profile</th>
              <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Name</th>
              <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Email</th>
              <th className="px-2 py-3 font-[poppins-medium] whitespace-nowrap">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[var(--bg-tertiary)]">
                <td className="px-2 py-3">
                  {user.profile_image_url ? (
                    <img
                      src={user.profile_image_url}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-100 block"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-400">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" fill="#bdbdbd" />
                        <rect x="6" y="14" width="12" height="6" rx="3" fill="#bdbdbd" />
                      </svg>
                    </div>
                  )}
                </td>
                <td className="px-2 py-3 font-medium whitespace-nowrap">{user.name}</td>
                <td className="px-2 py-3 text-[var(--text-secondary)] whitespace-nowrap">{user.email}</td>
                <td className="px-2 py-3">
                  <span className={`px-3 py-1 rounded-xl font-[poppins-medium] ${user.role =='admin' ? 'bg-[var(--color-primary)]/30 text-[var(--color-primary)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'} font-medium  text-xs whitespace-nowrap`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 600px) {
          table {
            min-width: 0 !important;
            font-size: 14px;
          }
          th, td {
            padding-left: 6px !important;
            padding-right: 6px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
