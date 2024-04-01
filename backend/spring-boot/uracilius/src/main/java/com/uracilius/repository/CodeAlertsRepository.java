package com.uracilius.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uracilius.entity.CodeAlertEntity;

public interface CodeAlertsRepository extends JpaRepository<CodeAlertEntity, String>{
	Page<CodeAlertEntity> findByFilePathContaining(String filePath, Pageable pageable);
	
	
	CodeAlertEntity findByFilePath(String filePath);
	
}
