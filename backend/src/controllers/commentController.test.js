const CSVReader = require('../services/csvReader');
const commentController = require('./commentController');

jest.mock('../services/CSVReader');

describe('getCodeAlertsByFilePath', () => {
  it('should return paginated results based on request parameters', async () => {
    const req = {
      body: {
        page: 2,
        pageSize: 10,
        filePath: '/path/to/file.csv',
      },
    };
    const res = {
      json: jest.fn(),
    };

    const filteredResults = [
      { ID: 1, FilePath: '/path/to/file.csv', Status: 'OK', Meta: 'Some meta' },
      { ID: 2, FilePath: '/path/to/file.csv', Status: 'Warning', Meta: 'Some meta' },
      // Add more test data if needed
    ];

    CSVReader.filterByFilePath.mockResolvedValue(filteredResults);

    await commentController.getCodeAlertsByFilePath(req, res);

    expect(CSVReader.filterByFilePath).toHaveBeenCalledWith('/path/to/file.csv');
    expect(res.json).toHaveBeenCalledWith({
      page: 2,
      pageSize: 10,
      totalCount: filteredResults.length,
      data: filteredResults.slice(10, 20), // Assuming pageSize is 10
    });
  });

  it('should handle errors and call next middleware', async () => {
    const req = {
      body: {
        page: 1,
        pageSize: 10,
        filePath: '/path/to/file.csv',
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    CSVReader.filterByFilePath.mockRejectedValue(new Error('Some error'));

    await commentController.getCodeAlertsByFilePath(req, res, next);

    expect(CSVReader.filterByFilePath).toHaveBeenCalledWith('/path/to/file.csv');
    expect(next).toHaveBeenCalledWith(new Error('Some error'));
  });
});