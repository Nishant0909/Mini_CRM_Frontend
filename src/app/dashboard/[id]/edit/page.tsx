"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchAllLeads, updateLead } from "@/lib/leads";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Swal from 'sweetalert2';

const EditLeadPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getLead = async () => {
      try {
        const leads = await fetchAllLeads();
        const lead = Array.isArray(leads) ? leads.find((l) => l.leadid?.toString() === id) : null;
        if (lead) {
          setFormData({
            name: lead.name || "",
            email: lead.email || "",
            phone: lead.phone || "",
            source: lead.source || "",
            status: lead.status || "",
            notes: lead.notes || "",
          });
        } else {
          setError("Lead not found");
        }
      } catch {
        setError("Failed to fetch lead");
      } finally {
        setLoading(false);
      }
    };
    if (id) getLead();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateLead({ id, ...formData });
      setSuccess(true);
      await Swal.fire({
        icon: 'success',
        title: 'Lead Updated',
        text: res?.message || 'The lead was updated successfully.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError("Failed to update lead");
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err?.message || err?.response?.data?.message || 'An error occurred while updating the lead.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Edit Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <Dropdown
          name="status"
          required
          value={formData.status}
          onChange={handleChange}
          options={[
            { label: "Select Status", value: "" },
            { label: "New", value: "New" },
            { label: "Contacted", value: "Contacted" },
            { label: "Interested", value: "Interested" },
            { label: "Converted", value: "Converted" },
            { label: "Lost", value: "Lost" },
          ]}
        />
        <Dropdown
          name="source"
          required
          value={formData.source}
          onChange={handleChange}
          options={[
            { label: "Select Source", value: "" },
            { label: "Website", value: "Website" },
            { label: "WhatsApp", value: "WhatsApp" },
            { label: "Call", value: "Call" },
            { label: "Referral", value: "Referral" },
            { label: "Other", value: "Other" },
          ]}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded min-h-[80px]"
        />
        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Update Lead
        </Button>
        {success && <div className="text-green-600 mt-2">Lead updated successfully!</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default EditLeadPage; 