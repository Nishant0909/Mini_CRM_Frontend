"use client";

import { useState } from "react";
import { createLead } from "@/lib/leads";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";

const CreateLeadPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "",
    notes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await createLead(formData);
      await Swal.fire({
        icon: 'success',
        title: 'Lead Created',
        text: res?.message || 'The lead was created successfully.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError("Failed to create lead");
      await Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: err?.message || err?.response?.data?.message || 'An error occurred while creating the lead.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>
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
          Create Lead
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateLeadPage;
