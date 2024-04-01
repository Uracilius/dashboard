package com.uracilius.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

}
