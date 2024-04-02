package com.uracilius.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "code_alerts") 
public class CodeAlertEntity {
	
	@Id
	private String id;
	
	@Column(name = "file_path")
	private String filePath;
	
	@Column(name="status")
    private String status;
	
	@Column(name="code")
    private String code;

	@Column(name="meta")
    private String meta;
	
	
	public String getCode(){
		return this.code;
	}
}