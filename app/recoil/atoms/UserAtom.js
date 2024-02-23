// Import the 'atom' function from Recoil
import { atom } from "recoil";

// Define a Recoil atom for managing user state
export const userState = atom({
  // Unique key for identifying the atom
  key: "userState",

  // Default value for the user state (an empty object in this case)
  default: {},
});
