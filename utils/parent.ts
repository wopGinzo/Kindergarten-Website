import axios from "axios";
import { Child } from "./educator";
import { Session } from "./admin";

export const getChild = async (token: string | null, parentUsername?: string | null): Promise<Child | null> => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },

          };
      console.log("fetching child for parent ",parentUsername)
      const child = await axios.get(`http://localhost:8000/api/child?parentUsername=${parentUsername}`, config);
      return child.data
    } catch (error: any) {
      console.error(error.message);
      return error;
    }
  };
  

  