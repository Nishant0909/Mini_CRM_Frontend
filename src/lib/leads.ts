import api from './api';
import {
  Get_All_Leads_API,
  Create_Lead_API,
  Update_Lead_API,
  Delete_Lead_API,
  Get_Lead_Actions_API
} from './constants';

// Fetch all leads
export const fetchAllLeads = async () => {
  const response = await api.get(Get_All_Leads_API);
  return response.data;
};

// Create a new lead
export const createLead = async (leadData: any) => {
  const response = await api.post(Create_Lead_API, leadData);
  return response.data;
};

// Update a lead (send id as URL param)
export const updateLead = async (leadData: any) => {
  const { id, ...rest } = leadData;
  const response = await api.put(`${Update_Lead_API}/${id}`, rest);
  return response.data;
};

// Delete a lead (send id as URL param)
export const deleteLead = async (leadId: string) => {
  const response = await api.delete(`${Delete_Lead_API}/${leadId}`);
  return response.data;
};

// Get lead actions
export const getLeadActions = async (leadId: string) => {
  const response = await api.get(Get_Lead_Actions_API, { params: { leadid: leadId } });
  return response.data;
}; 