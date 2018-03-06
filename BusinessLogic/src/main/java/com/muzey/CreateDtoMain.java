package com.muzey;

import com.muzey.tool.DtoFactory;
import com.muzey.until.FileUtil;

public class CreateDtoMain {

	public static void main(String[] args) {

		FileUtil.delete("src\\main\\java\\com\\muzey\\dto\\");
		DtoFactory df = new DtoFactory();
		df.dtoMain();
	}
}
