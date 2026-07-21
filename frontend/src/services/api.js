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

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Failed to scan website!");
  }

  return data;

}

export async function getScanHistory(){

  const response = await fetch(`${API_BASE_URL}/scan/history/recent`);

  if(!response.ok){
    throw new Error("Failed to fetch scan history");
  }

  return response.json();

}

export async function getScanReportById(id){
  const response = await fetch(`${API_BASE_URL}/scan/${id}`);

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message || "Failed to fetch scan report");
  }

  return data;
}