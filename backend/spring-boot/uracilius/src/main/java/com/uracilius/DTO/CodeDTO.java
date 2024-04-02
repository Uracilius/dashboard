package com.uracilius.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeDTO {
	private String code;

	public CodeDTO(String code) {
		this.code = code;
	}
}
