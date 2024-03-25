const fs = require('fs');
const csvParser = require('csv-parser');

const reportPath = './src/resources/report.csv';

class CSVReader {
    static async readCSV() {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(reportPath)
                .pipe(csvParser())
                .on('data', (row) => results.push(row))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }

    static async filterByFilePath(filePath) {
        const rows = await this.readCSV();
        return rows.filter(row => row.FilePath === filePath);
    }

    static async findByID(id) {
        const rows = await this.readCSV();
        return rows.find(row => row.ID === id);
    }

    static async getUniqueFilePaths() {
        const rows = await this.readCSV();
        const filePathSet = new Set(rows.map(row => row.FilePath));
        return [...filePathSet];
    }

    static async getAlertStatistics() {
        const rows = await this.readCSV();
        const commentCounts = {};

        rows.forEach((row) => {
            const status = row.Status;
            if (!commentCounts[status]) {
                commentCounts[status] = { count: 0, files: new Set() };
            }
            commentCounts[status].count += 1;
            commentCounts[status].files.add(row.FilePath);
        });

        const statusStatisticsList = Object.entries(commentCounts).map(([status, { count }]) => ({
            status: status,
            numOfAlerts: count,
        }));

        const totalUniqueFiles = new Set();
        Object.values(commentCounts).forEach(({ files }) => {
            files.forEach(file => totalUniqueFiles.add(file));
        });

        return {
            statusStatisticsList,
            numOfFiles: totalUniqueFiles.size,
        };
    }
}

module.exports = CSVReader;
