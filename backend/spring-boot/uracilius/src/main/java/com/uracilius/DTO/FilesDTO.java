package com.uracilius.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilesDTO {

	private String filePath;
	
	private int page;
	
	private int pageSize;
}
