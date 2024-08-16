import axios from "axios";
import { supabase } from "./auth"; // Import supabase client to get the current session

const API_URL = import.meta.env.VITE_API_URL;

export const getTenantData = async (userId) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      throw new Error("User not authenticated");
    }

    const response = await axios.get(`${API_URL}/api/profile/tenant`, {
      params: { user_id: userId },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    return response.data.tenantData;
  } catch (error) {
    console.error("Error fetching tenant data:", error);
    throw error;
  }
};

export const updateTenantData = async (tenantData) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      throw new Error("User not authenticated");
    }

    const response = await axios.put(
      `${API_URL}/api/profile/tenant`,
      tenantData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating tenant data:", error);
    throw error;
  }
};

export const fetchEmployeeScores = async (tenantId) => {
  try {
    // Get the current session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      throw new Error("User not authenticated");
    }

    const response = await axios.get(`${API_URL}/api/employees/scores`, {
      params: { tenant_id: tenantId },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // Include the JWT token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employee scores:", error);
    throw error;
  }
};

export const fetchAverageScores = async (tenantId) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      throw new Error("User not authenticated");
    }

    const response = await axios.get(
      `${API_URL}/api/employees/average-scores`,
      {
        params: { tenant_id: tenantId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching average scores:", error);
    throw error;
  }
};
