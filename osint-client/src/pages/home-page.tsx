import React, { useEffect } from "react";
import { DomainForm } from "@/components/domain-form";
import { ScanCard } from "@/components/scan-card";
import { useState } from "react";
import { ScannedResult } from "../models/scan";
import { getAllScannedResults, initiateScan } from "../api/scan";
import styles from "./home-page.module.scss";
import { transformScanResultDates } from "../utils/scanResult";

export const HomePage = () => {
  const [scans, setScans] = useState<ScannedResult[]>([]);

  const onScan = async (domain: string) => {
    const scanResult = await initiateScan(domain);

    if (scanResult) {
      setScans((prev) => [...prev, transformScanResultDates(scanResult)]);
    }
  };

  useEffect(() => {
    getAllScannedResults().then((results) => {
      setScans(results.map(transformScanResultDates));
    });
  }, []);

  return (
    <div className={styles.wrapper}>
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
