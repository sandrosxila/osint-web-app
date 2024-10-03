import { ScannedResult } from "@/models/scan";

export const getAllScannedResults = async (limit?: number) => {
  const response = await fetch(`osint/scans?${limit != undefined ? 'limit=' + limit : ''}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    throw Error(response.statusText);
  }

  return (await response.json()) as ScannedResult[];
};

export const getScannedResult = async (id: number) => {
  const response = await fetch(`osint/scans/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    throw Error(response.statusText);
  }

  return (await response.json()) as ScannedResult;
};

export const initiateScan = async (domain: string) => {
  const response = await fetch("osint/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain }),
  });

  if(!response.ok) {
    throw Error(response.statusText);
  }

  return (await response.json()) as ScannedResult;
};
