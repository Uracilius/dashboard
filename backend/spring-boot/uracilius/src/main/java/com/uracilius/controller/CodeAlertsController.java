package com.uracilius.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uracilius.DTO.CodeDTO;
import com.uracilius.DTO.CodeLineDTO;
import com.uracilius.DTO.FileFilterRequest;
import com.uracilius.DTO.FilesDTO;
import com.uracilius.service.CodeAlertsService;

@CrossOrigin
@RestController
public class CodeAlertsController {
	
	@Autowired
	private CodeAlertsService codeAlertsService;
	
	@PostMapping("/getFilesByFilter")
	public FilesDTO getFilesByFilter(@RequestBody FileFilterRequest request) {
	    return codeAlertsService.getFilesByFilter(request);
	}
	
	@PostMapping("/getCodeAlertsByFilePath")
	public List<CodeLineDTO> getCodeAlerts(@RequestBody FileFilterRequest request) {
		return codeAlertsService.getCodeAlertsByFilePath(request.getPage(), request.getPageSize(), request.getFilePath()); 
	}
	
	@PostMapping("/getCode")
	public CodeDTO getCode(@RequestBody FileFilterRequest request) {
	    return codeAlertsService.getCodeById(request.getId());
	}

}
