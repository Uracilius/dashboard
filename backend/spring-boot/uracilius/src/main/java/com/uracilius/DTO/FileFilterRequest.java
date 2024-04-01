package com.uracilius.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileFilterRequest {
	private int page;
    private int pageSize;
    private String fileNameFilter;
}
