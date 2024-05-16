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
