const API_BASE_URL = "http://localhost:8080/api";

export async function getHealthStatus(){
  const response = await fetch(`${API_BASE_URL}/health`);

  if(!response.ok){
    throw new Error("Failed to fetch backend health status");
  }

  return response.json();
}

export async function scanWebsite(url){

  const response = await fetch(`${API_BASE_URL}/scan`,{
    
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify({ url }),

  });

  if(!response.ok){
    throw new Error("Failed to scan website!");
  }

  return response.json();

}