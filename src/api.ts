
export const api_host = "https://8rxb5n4d52.execute-api.ap-southeast-1.amazonaws.com/dev"
export const image_host = "https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/images/"

export const url = (url: string) => {
  return api_host.concat(url);
}

export const urlImage = (url: string) => {
  return image_host.concat(url);
}

// Define a generic API response type
export interface ApiResponse<T> {
  data: T | null;
  count?: number | null;
  error: string | null;
}

// Abstract fetch function
async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, { headers: { "Content-Type": "application/json", ...(options?.headers || {}), }, ...options, });

    if (!response.ok) {
      return { data: null, error: `Error: ${response.status} ${response.statusText}` };
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

export default fetchApi

  // Example usage
  // interface User {
  //   id: number;
  //   name: string;
  //   email: string;
  // }
  
  // async function getUsers() {
  //   const result = await fetchApi<User[]>("https://jsonplaceholder.typicode.com/users");
  
  //   if (result.error) {
  //     console.error("Failed to fetch users:", result.error);
  //   } else {
  //     console.log("Users:", result.data);
  //   }
  // }
  
  // getUsers();
  