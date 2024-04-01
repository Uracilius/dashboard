package com.uracilius.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;

import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.DTO.FileDTO;
import com.uracilius.DTO.FileFilterRequest;
import com.uracilius.DTO.FilesDTO;
import com.uracilius.DTO.alertStatsDTO;
import com.uracilius.repository.CodeAlertsRepository;
import com.uracilius.service.CodeAlertsService;
import com.uracilius.entity.CodeAlertEntity;

@Service
@RequiredArgsConstructor
public class CodeAlertsServiceImpl implements CodeAlertsService{

	@Autowired
	private CodeAlertsRepository codeAlertRepository;
	
	@Cacheable
	@Override
	public FilesDTO getFilesByFilter(FileFilterRequest fileFilterRequest) {
	    PageRequest pageRequest = PageRequest.of(fileFilterRequest.getPage(), fileFilterRequest.getPageSize());

	    Page<CodeAlertEntity> pageResult;
	    if (fileFilterRequest.getFileNameFilter() == null || fileFilterRequest.getFileNameFilter().isEmpty()) {
	        pageResult = codeAlertRepository.findAll(pageRequest);
	    } else {
	        pageResult = codeAlertRepository.findByFilePathContaining(fileFilterRequest.getFileNameFilter(), pageRequest);
	    }

	    List<FileDTO> fileDTOList = pageResult.getContent().stream()
	        .map(entity -> {
	            FileDTO fileDTO = new FileDTO();
	            fileDTO.setFilePath(entity.getFilePath());
	            return fileDTO;
	        })
	        .collect(Collectors.toList());

	    FilesDTO filesDTO = new FilesDTO();
	    filesDTO.setFiles(fileDTOList);
	    filesDTO.setPage(fileFilterRequest.getPage());
	    filesDTO.setPageSize(fileFilterRequest.getPageSize());

	    return filesDTO;
	}

	@Override
	public CodeLineDTO getCodeAlertsByFilePath(int page, int pageSize, String filePath) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public CodeDTO getCode(String filePath) {
		CodeAlertEntity queryResult = codeAlertRepository.findByFilePath(filePath);
	
		if (!queryResult.equals(null)) {
			CodeDTO codeDTO = new CodeDTO(queryResult.getCode());
			return codeDTO;
        }
		return null;
	}

	@Override
	public alertStatsDTO getAlertStats() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
