import React, { useState } from "react";
import { ScannedResult } from "@/models/scan";

import styles from "./scan-card.module.scss";
import { Modal } from "./modal";

type ScanCardProps = {
  scan: ScannedResult;
};

export const ScanCard = ({ scan }: ScanCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.card}>
      <span className={styles.domainName}>{scan.domain}</span>
      <span className={styles.time}>Start Time: {scan.startTime}</span>
      <span className={styles.time}>End Time: {scan.endTime}</span>
      <span className={styles.actions}>
        <button onClick={() => setShowModal(true)}>View Details</button>
      </span>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <dl className={styles.modalContent}>
          <dt>Domain: </dt>
          <dd>{scan.domain}</dd>

          <dt>Start Time: </dt>
          <dd>{scan.startTime}</dd>

          <dt>End Time: </dt>
          <dd>{scan.endTime}</dd>

          <dt>Scan Results: </dt>
          <dd className={styles.scanResultsData}>
            <ResultDataList name="E-mails" data={scan.output.emails} />
            <ResultDataList name="Hosts" data={scan.output.hosts} />
            <ResultDataList name="Shodan" data={scan.output.shodan} />
          </dd>
        </dl>
      </Modal>
    </div>
  );
};

type ResultDataProps = {
  name: string;
  data?: string[];
};

const ResultDataList = ({ name, data = [] }: ResultDataProps) => {
  return (
    <>
      {data.length > 0 && (
        <dl>
          <dt>{name}: </dt>
          <dd>
            <ul>
              {data.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </dd>
        </dl>
      )}
    </>
  );
};
