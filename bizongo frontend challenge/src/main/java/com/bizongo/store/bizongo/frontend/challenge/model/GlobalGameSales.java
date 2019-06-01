package com.bizongo.store.bizongo.frontend.challenge.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class GlobalGameSales {

	
	@Id
	@Column(name="RANK")
	private int rank;
	
	private String name;
	
	private int year;
	
	private String platform;
	
	private String genre;
	
	private String publisher;
	
	private int globalsale;

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public int getGlobalsale() {
		return globalsale;
	}

	public void setGlobalsale(int globalsale) {
		this.globalsale = globalsale;
	}
	
	
	
	
}
