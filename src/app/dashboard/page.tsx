"use client";

import { useEffect, useState } from "react";
import { fetchAllLeads, deleteLead } from "@/lib/leads";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Swal from 'sweetalert2';

const DashboardPage = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchField, setSearchField] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  const getLeads = async () => {
    try {
      const data = await fetchAllLeads();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this lead?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    setDeletingId(id);
    try {
      const res = await deleteLead(id);
      await getLeads();
      await Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: res?.message || 'Lead has been deleted.',
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true
      });
    } catch (err: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err?.message || err?.response?.data?.message || 'Failed to delete lead.',
        confirmButtonText: 'OK'
      });
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const statusMatch = statusFilter ? lead.status === statusFilter : true;
    const sourceMatch = sourceFilter ? lead.source === sourceFilter : true;
    const searchMatch = searchValue
      ? (lead[searchField] && lead[searchField].toLowerCase().includes(searchValue.toLowerCase()))
      : true;
    return statusMatch && sourceMatch && searchMatch;
  });

  return (
    <div className="flex flex-1 flex-col items-center bg-gray-50 px-2 sm:px-4 min-h-screen">
      <div className="w-full max-w-5xl p-2 sm:p-8 bg-white rounded-lg shadow-md text-black mt-2 sm:mt-8">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h1 className="text-2xl sm:text-2xl font-bold">Leads</h1>
          <Link href="/dashboard/create" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow text-xs sm:text-sm">
            + Add Lead
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
            <Dropdown
              value={searchField}
              onChange={e => setSearchField(e.target.value)}
              options={[
                { label: "Name", value: "name" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "phone" },
              ]}
            />
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder={`Search by ${searchField}`}
              className="border rounded px-2 py-1 text-xs sm:text-sm w-40 sm:w-48 bg-white"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
            <Dropdown
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              options={[
                { label: "All Statuses", value: "" },
                { label: "New", value: "New" },
                { label: "Contacted", value: "Contacted" },
                { label: "Interested", value: "Interested" },
                { label: "Converted", value: "Converted" },
                { label: "Lost", value: "Lost" },
              ]}
            />
            <Dropdown
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              options={[
                { label: "All Sources", value: "" },
                { label: "Website", value: "Website" },
                { label: "WhatsApp", value: "WhatsApp" },
                { label: "Call", value: "Call" },
                { label: "Referral", value: "Referral" },
                { label: "Other", value: "Other" },
              ]}
            />
            <Button
              type="button"
              onClick={() => { setStatusFilter(""); setSourceFilter(""); setSearchValue(""); setSearchField('name'); }}
              variant="secondary"
              className="border border-gray-300 rounded px-3 py-1 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300"
            >
              Reset
            </Button>
          </div>
        </div>
        {loading ? (
          <div>Loading leads...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-[600px] w-full border text-xs sm:text-sm hidden md:table">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">#</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Name</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Email</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Phone</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Status</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-left whitespace-nowrap">Source</th>
                  <th className="px-2 sm:px-4 py-2 border-b text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead.leadid || idx} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{idx+1}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{lead.name}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{lead.email}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{lead.phone}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{lead.status}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{lead.source}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap flex gap-2 justify-center">
                      <Link
                        href={`/dashboard/${lead.leadid}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 pt-2 rounded text-xs"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/${lead.leadid}/activity`}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 sm:px-3 pt-2 rounded text-xs"
                      >
                        Logs
                      </Link>
                      <Button
                        onClick={() => handleDelete(lead.leadid)}
                        disabled={deletingId === lead.leadid}
                        variant="danger"
                        className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs"
                      >
                        {deletingId === lead.leadid ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4">
              {filteredLeads.map((lead, idx) => (
                <div key={lead.leadid || idx} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-700">#{idx+1}</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/${lead.leadid}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/${lead.leadid}/activity`}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Logs
                      </Link>
                      <Button
                        onClick={() => handleDelete(lead.leadid)}
                        disabled={deletingId === lead.leadid}
                        variant="danger"
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        {deletingId === lead.leadid ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm"><span className="font-semibold">Name:</span> {lead.name}</div>
                  <div className="text-sm"><span className="font-semibold">Email:</span> {lead.email}</div>
                  <div className="text-sm"><span className="font-semibold">Phone:</span> {lead.phone}</div>
                  <div className="text-sm"><span className="font-semibold">Status:</span> {lead.status}</div>
                  <div className="text-sm"><span className="font-semibold">Source:</span> {lead.source}</div>
                </div>
              ))}
              {filteredLeads.length === 0 && <div className="text-gray-500 mt-4">No leads found.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
