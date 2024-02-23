import axios from "axios";

// Fetch user details based on authentication information
export const fetchUserDetails = async (auth, setUser) => {
  try {
    const response = await axios.get(
      `https://paytm-clone-backend-production.up.railway.app/api/users/${auth.userId}`,
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    
    // Set the user details in the state or context
    setUser(response.data.user);

    // Return the user details for potential further use
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Fetch account balance based on authentication information
export const fetchAccountBalance = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/account/balance",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    
    // Return the account balance data
    return response.data;
  } catch (error) {
    console.error("Error fetching user account balance:", error);
    throw error;
  }
};

// Fetch a list of users based on authentication information
export const fetchUsers = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/users/",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    
    // Return the list of users
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch user transactions based on authentication information
export const fetchTransactions = async (auth) => {
  try {
    const response = await axios.get(
      "https://paytm-clone-backend-production.up.railway.app/api/account/transactions",
      {
        headers: {
          Authorization: auth.JWT,
        },
      }
    );
    
    // Return the list of user transactions
    return response.data.transactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};
