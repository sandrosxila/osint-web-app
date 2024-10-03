import { useState } from "react";
import styles from "./domain-form.module.scss";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type DomainFormProps = {
  onScan: (domain: string) => void;
};

export const DomainForm = ({ onScan }: DomainFormProps) => {
  const [domain, setDomain] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onScan(domain);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.domainForm}>
      <Input
        className={styles.input}
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain"
        required
      />
      <Button type="submit" className={styles.button}>
        Scan
      </Button>
    </form>
  );
};
