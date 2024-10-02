import React, { useState } from "react";
import { ScannedDomain } from "@/models/scan";

import styles from './scan-card.module.scss';

type ScanCardProps = {
  scan: ScannedDomain;
};

export const ScanCard = ({ scan }: ScanCardProps) => {
  const [, setShowModal] = useState(false);

  return (
    <div className={styles.card}>
      <span>{scan.domain}</span>
      <span>Start Time: {scan.startTime}</span>
      <span>End Time: {scan.endTime}</span>
      <button onClick={() => setShowModal(true)}>View Details</button>
    </div>
  );
}
