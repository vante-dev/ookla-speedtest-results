# Ookla Speedtest Results
This repository provides a method to scrape and obtain internet speed test results from Speedtest.net, presented by Ookla, in JSON format. This can be useful for those needing structured data on download and upload speeds without manually extracting it from the website.

## Getting Started
These instructions will guide you on how to set up and use the script to fetch speed test data.

### Prerequisites
- Node.js
- npm or yarn
- axios

### Installation
1. Clone the repository:
```sh
git clone https://github.com/vante.dev/ookla-speedtest-results.git
cd ookla-speedtest-results
```

2. Install dependencies:
```sh
npm install axios
or
yarn add axios
```

### Usage
To use the script to scrape Ookla speed test data, follow the example code below. The function scrapeOoklaData fetches data from the provided URL and parses the download and upload speeds from the response.

```ts
import axios from 'axios';

async function scrapeOoklaData(url: string) {
    try {
        const res = await axios.get(url);
        const match = res.data.match(/window\.OOKLA\.INIT_DATA\s*=\s*(\{.*?\});/);
        if (match) {
            const data = JSON.parse(match[1]);
            return {
                download: data.result.download / 1000, // in Mbps
                upload: data.result.download / 1000, // in Mbps
            };
        }
        return {
            download: 0,
            upload: 0,
        };
    } catch (error) {
        return {
            download: 0,
            upload: 0,
        };
    }
}

// Example usage:
const url = 'https://www.speedtest.net/result/your-test-id';
scrapeOoklaData(url).then((data) => {
    console.log('Download speed:', data.download, 'Mbps');
    console.log('Upload speed:', data.upload, 'Mbps');
});
```

### Notes
- Make sure to replace 'https://www.speedtest.net/result/your-test-id' with the actual URL of the Speedtest result page you want to scrape.
- The download and upload speeds are returned in Mbps.
- In case of an error or if the data is not found, the function will return speeds of 0 Mbps.
