import React, { useEffect } from "react";
import { DomainForm } from "@/components/domain-form";
import { ScanCard } from "@/components/scan-card";
import { useState } from "react";
import { ScannedResult } from "../models/scan";
import { getAllScannedResults, initiateScan } from "../api/scan";
import styles from "./home-page.module.scss";
import { transformScanResultDates } from "../utils/scanResult";
import toast, { Toaster } from "react-hot-toast";
import { oneTimeErrorToast } from "@/utils/toasts";

const HISTORY_LIMIT = 5;

export const HomePage = () => {
  const [scans, setScans] = useState<ScannedResult[]>([]);

  const onScan = async (domain: string) => {
    toast.loading("Scanning the domain...", {
      id: "domain-scan",
      style: {
        background: "#333",
        color: "white",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#ccc",
      },
    });

    try {
      const scanResult = await initiateScan(domain);
      toast.dismiss("domain-scan");

      setScans((prev) => [transformScanResultDates(scanResult), ...prev]);
    } catch (e) {
      toast.dismiss("domain-scan");

      if (e instanceof Error) {
        oneTimeErrorToast(
          `Couldn't scan the domain: ${e.message}`,
          "domain-scan-error"
        );
      }
    }
  };

  useEffect(() => {
    getAllScannedResults(HISTORY_LIMIT)
      .then((results) => {
        setScans(results.map(transformScanResultDates));
      })
      .catch((e) => {
        if (e instanceof Error) {
          oneTimeErrorToast(
            `Couldn't load scan results: ${e.message}`,
            "all-scan-results"
          );
        }
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Toaster
        containerClassName={styles.toaster}
        position="top-center"
        reverseOrder={false}
      />
      <div className={styles.domainScanner}>
        <h1>Domain Scanner</h1>
        <DomainForm onScan={onScan} />
      </div>
      <div className={styles.scanResults}>
        {scans.map((scan) => (
          <ScanCard key={scan.id} scan={scan} />
        ))}
      </div>
    </div>
  );
};
