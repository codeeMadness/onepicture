import CryptoJS from "crypto-js";

export const api_host = "https://8rxb5n4d52.execute-api.ap-southeast-1.amazonaws.com/dev"
export const image_host = "https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/images/"

const SECRET = "jinkhemeoheng"

function sha256(data: string) {
  return CryptoJS.SHA256(data).toString();
}

function signRequest(
  method: string,
  path: string,
  body?: any
) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyHash = body ? sha256(body) : "";
  const message = `${method}${"/dev".concat(path)}${timestamp}${bodyHash}`;

  const signature = CryptoJS.HmacSHA256(message, SECRET).toString();

  return {
    "x-timestamp": timestamp,
    "x-signature": signature,
  };
}



const constructURL = (url: string) => {
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
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const {method, body} = options ?? {} 
  const signed = signRequest(method ?? "GET", url, body);
  try {
    const response = await fetch(constructURL(url), { 
      headers: { 
        "Content-Type": "application/json", 
        ...(options?.headers || {}), 
        ...signed,
      }, 
        ...options, 
      });
    const data: T = await response.json();
    return data;

  } catch (err) {
      console.log('error', err)
      throw err
  }
}

export default fetchApi


  