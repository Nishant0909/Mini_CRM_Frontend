const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const USERS_URL = `${BASE_API_URL}/api/users`;
const LEADS_URL = `${BASE_API_URL}/api/leads`;

// Users API
export const Login_User_API = `${USERS_URL}/login`;
export const Logout_User_API = `${USERS_URL}/logout`;
export const Register_User_API = `${USERS_URL}/register`;

// Leads API
export const Get_All_Leads_API = `${LEADS_URL}/getleadDetails`;
export const Create_Lead_API = `${LEADS_URL}/createlead`;
export const Update_Lead_API = `${LEADS_URL}/updatelead`;
export const Delete_Lead_API = `${LEADS_URL}/deletelead`;
export const Get_Lead_Actions_API = `${LEADS_URL}/getleadactions`;