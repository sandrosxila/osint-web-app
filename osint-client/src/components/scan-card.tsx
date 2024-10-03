import { useState } from "react";
import { ScannedResult } from "@/models/scan";
import { Button } from "./ui/button";
import { ScanModal } from "./scan-modal";

import styles from "./scan-card.module.scss";

type ScanCardProps = {
  scan: ScannedResult;
};

export const ScanCard = ({ scan }: ScanCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <span className={styles.domainName}>{scan.domain}</span>
        <span className={styles.time}>Start Time: {scan.startTime}</span>
        <span className={styles.time}>End Time: {scan.endTime}</span>
        <span className={styles.actions}>
          <Button className={styles.button} onClick={() => setShowModal(true)}>
            View Details
          </Button>
        </span>
      </div>
      <ScanModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        scan={scan}
      />
    </>
  );
};
