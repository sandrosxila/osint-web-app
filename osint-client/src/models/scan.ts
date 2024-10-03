export type ScannedResult = {
  id: number;
  domain: string;
  startTime: string;
  endTime: string;
  output: {
    emails: string[];
    hosts: string[];
    shodan: string[];
  };
};
