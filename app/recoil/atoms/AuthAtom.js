// Import the 'atom' function from Recoil
import { atom } from "recoil";

// Define a Recoil atom for managing authentication state
export const authState = atom({
  // Unique key for identifying the atom
  key: "authState",

  // Default value for the authentication state
  default: { JWT: "", auth: false, userId: "" },
});
