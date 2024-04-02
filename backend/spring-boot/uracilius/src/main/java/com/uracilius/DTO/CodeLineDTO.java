package com.uracilius.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeLineDTO {
	
	private String Id;

	private String filePath;
	
	private String status;
	
	private String meta;

	public CodeLineDTO(String id, String filePath, String status, String meta) {
		super();
		Id = id;
		this.filePath = filePath;
		this.status = status;
		this.meta = meta;
	}
	
	
}
