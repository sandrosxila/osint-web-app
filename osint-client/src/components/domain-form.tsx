import { useState } from "react";

type DomainFormProps = {
  onScan: (domain: string) => void
}

export const DomainForm = ({ onScan }: DomainFormProps) => {
    const [domain, setDomain] = useState("");

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onScan(domain);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain"
                required
            />
            <button type="submit">Scan</button>
        </form>
    );
}