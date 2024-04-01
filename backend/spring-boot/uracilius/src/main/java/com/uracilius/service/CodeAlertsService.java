package com.uracilius.service;
import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.DTO.FileFilterRequest;
import com.uracilius.DTO.FilesDTO;
import com.uracilius.DTO.alertStatsDTO;

public interface CodeAlertsService {
	
	FilesDTO getFilesByFilter(FileFilterRequest fileFilterRequest);

	CodeLineDTO getCodeAlertsByFilePath(int page, int pageSize, String filePath);
	
	CodeDTO getCode(String filePath);
	
	alertStatsDTO getAlertStats();
	
}
