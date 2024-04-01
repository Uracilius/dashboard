package com.uracilius.DTO;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilesDTO {

	private List<FileDTO> files;
    private int page;
    private int pageSize;

}
