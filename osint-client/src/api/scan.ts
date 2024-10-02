import { ScannedDomain } from "@/models/scan";

export const getAllScannedResults = async () => {
  const response = await fetch("osint/scans", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()) as ScannedDomain[];
};

export const getScannedResult = async (id: number) => {
  const response = await fetch(`osint/scans/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (await response.json()) as ScannedDomain;
};

export const initiateScan = async (domain: string) => {
  const response = await fetch("osint/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ domain }),
  });

  return (await response.json()) as ScannedDomain;
};
