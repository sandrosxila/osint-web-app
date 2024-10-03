import React from "react";
import styles from "./scan-card.module.scss";
import { Modal } from "./ui/modal";
import { ScannedResult } from "@/models/scan";

type ScanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  scan: ScannedResult;
};

export const ScanModal = ({ isOpen, onClose, scan }: ScanModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <dl className={styles.modalContent}>
        <dt className={styles.dl}>Domain: </dt>
        <dd className={styles.dd}>{scan.domain}</dd>

        <dt className={styles.dl}>Start Time: </dt>
        <dd className={styles.dd}>{scan.startTime}</dd>

        <dt className={styles.dl}>End Time: </dt>
        <dd className={styles.dd}>{scan.endTime}</dd>

        <dt className={styles.dl}>Scan Results: </dt>
        <dd className={styles.scanResultsData}>
          {scan.output.emails.length +
            scan.output.hosts.length +
            scan.output.shodan.length >
          0 ? (
            <>
              <ResultDataList name="E-mails" data={scan.output.emails} />
              <ResultDataList name="Hosts" data={scan.output.hosts} />
              <ResultDataList name="Shodan" data={scan.output.shodan} />
            </>
          ) : (
            "No Results"
          )}
        </dd>
      </dl>
    </Modal>
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
