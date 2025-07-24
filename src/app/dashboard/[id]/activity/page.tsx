"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLeadActions } from "@/lib/leads";

const LeadActivityPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLeadActions(id);
        setActions(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError("Failed to fetch activity log");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchActions();
  }, [id]);

  return (
    <div className="mx-auto m-10 p-6 bg-white shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
      {loading ? (
        <div>Loading activity log...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : actions.length === 0 ? (
        <div className="text-gray-600">No activity found for this lead.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">#</th>
                <th className="px-4 py-2 border-b text-left">Timestamp</th>
                <th className="px-4 py-2 border-b text-left">Lead ID</th>
                <th className="px-4 py-2 border-b text-left">Lead Name</th>
                <th className="px-4 py-2 border-b text-left">Value Type</th>
                <th className="px-4 py-2 border-b text-left">Old Value</th>
                <th className="px-4 py-2 border-b text-left">Updated Value</th>
                <th className="px-4 py-2 border-b text-left">Update By</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b whitespace-nowrap">{idx+1}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.updated_date ? new Date(action.updated_date).toLocaleString() : '-'}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.userid}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.lead_name}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.valuetype}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.oldvalue}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.updatedvalue}</td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">{action.first_name} {action.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadActivityPage; 