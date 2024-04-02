package com.uracilius.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.entity.CodeAlertEntity;

public interface CodeAlertsRepository extends PagingAndSortingRepository<CodeAlertEntity, String>{
	Page<CodeAlertEntity> searchByFilePathContaining(String filePath, Pageable pageable);
	
	CodeDTO getCodeById(String Id);
	
	Page<CodeLineDTO> findByFilePath(@Param("filePath") String filePath, Pageable pageable);

	int count();
	
}
