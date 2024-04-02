package com.uracilius.service;
import java.util.List;

import org.springframework.data.domain.Page;

import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.DTO.FileFilterRequest;
import com.uracilius.DTO.FilesDTO;
import com.uracilius.DTO.alertStatsDTO;

public interface CodeAlertsService {
	
	FilesDTO getFilesByFilter(FileFilterRequest fileFilterRequest);

	List<CodeLineDTO> getCodeAlertsByFilePath(int page, int pageSize, String filePath);
	
	CodeDTO getCodeById(String Id);
	
	alertStatsDTO getAlertStats();
	
}
