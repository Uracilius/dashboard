package com.uracilius.service.impl;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.DTO.FileFilterRequest;
import com.uracilius.DTO.FilesDTO;
import com.uracilius.DTO.alertStatsDTO;
import com.uracilius.service.CodeAlertsService;

@Service
@RequiredArgsConstructor
public class CodeAlertsServiceImpl implements CodeAlertsService{

	@Cacheable
	@Override
	public FilesDTO getFilesByFilter(FileFilterRequest fileFilterRequest) {
		// TODO Auto-generated method stub
		
		return null;
	}

	@Override
	public CodeLineDTO getCodeAlertsByFilePath(int page, int pageSize, String filePath) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public CodeDTO getCode(String filePath) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Cacheable
//	@Override
//	public CodeDTO getCode(String filePath) {
//        // Assuming findByFilePath exists and returns an instance of YourCSVModel or null if not found
//        YourCSVModel row = csvReader.findByFilePath(filePath);
//        if (row == null) {
//            return null; // Or throw a custom exception if preferred
//        }
//        
//        // Assuming YourCSVModel has a getCode method to get the code snippet
//        return new CodeDTO(row.getId(), row.getCode());
//    }

	@Override
	public alertStatsDTO getAlertStats() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
