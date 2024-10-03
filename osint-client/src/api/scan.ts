import { ScannedResult } from "@/models/scan";

export const getAllScannedResults = async () => {
  const response = await fetch("osint/scans", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    return [] as ScannedResult[]
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
    return null;
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
    return null;
  }

  return (await response.json()) as ScannedResult;
};
