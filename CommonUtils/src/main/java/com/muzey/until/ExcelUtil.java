package com.muzey.until;

import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.muzey.until.model.ExcelCellModel;
import com.muzey.until.model.ExcelSheetModel;

public class ExcelUtil {

	/**
	 * 自定义输出Excel
	 * 
	 * @param dataList
	 * @return
	 * @throws Exception
	 */
	public static InputStream writeExcelToFile(List<ExcelSheetModel> dataList) throws Exception {

		// 列宽一个像素的固定值
		BigDecimal pixCellConst = new BigDecimal(31.94888178913738);
		// 行宽一个像素的固定值
		BigDecimal pixRowConst = new BigDecimal(15.15151515151515);

		InputStream is = null;

		String location = null;

		XSSFWorkbook workbook = null;

		XSSFRow row = null;

		workbook = new XSSFWorkbook();

		for (ExcelSheetModel dataSheet : dataList) {

			if (CheckUtil.isNotNullOrEmpty(dataSheet.getSheetType())) {

			} else {

				System.out.println(dataSheet.getSheetName() + "为自定义模式");

				XSSFSheet sheet = workbook.createSheet(dataSheet.getSheetName());

				for (ExcelCellModel dataCell : dataSheet.getDataList()) {

					if (CheckUtil.isNotNullOrEmpty(dataCell.getLocation())) {

						location = dataCell.getLocation().toUpperCase();
						int dataNum = 0;
						int dataRow = 0;
						String rowStr = new String();
						String columnStr = new String();
						for (int i = 0; i < location.length(); i++) {
							if (location.charAt(i) >= 48 && location.charAt(i) <= 57) {
								columnStr += location.charAt(i);
							}
							if (location.charAt(i) >= 65 && location.charAt(i) <= 90) {
								rowStr += location.charAt(i);
							}
						}
						for (int i = 0; i < rowStr.length(); i++) {
							char ch = rowStr.charAt(rowStr.length() - i - 1);
							dataNum = (int) (ch - 'A' + 1);
							dataNum *= Math.pow(26, i);
							dataRow += dataNum;
						}

						dataCell.setRowNum(Integer.parseInt(columnStr) - 1);
						dataCell.setCellNum(dataRow - 1);
					}

					System.out.println(dataSheet.getSheetName() + "->Row:" + dataCell.getRowNum() + "->Cell:"
							+ dataCell.getCellNum() + "->Strat");

					XSSFCellStyle setBorder = (XSSFCellStyle) workbook.createCellStyle();
					XSSFFont font = (XSSFFont) workbook.createFont();
					XSSFColor fontColor = null;
					XSSFColor backColor = null;
					if (CheckUtil.isNullOrEmpty(row) || row.getRowNum() != dataCell.getRowNum()) {

						row = sheet.createRow(dataCell.getRowNum());
					}

					XSSFCell cell = row.createCell(dataCell.getCellNum());

					// check合并单元格
					if (CheckUtil.isNotNullOrEmpty(dataCell.getRegionCell())) {

						if (dataCell.getRegionCell().length == 2) {

							if (dataCell.getRowNum() > dataCell.getRegionCell()[0]) {

								System.out.println("RegionCella结束行小于当前行");

							} else if (dataCell.getCellNum() > dataCell.getRegionCell()[1]) {

								System.out.println("RegionCella结束列小于当前列");

							} else {

								sheet.addMergedRegion(
										new CellRangeAddress(dataCell.getRowNum(), dataCell.getRegionCell()[0],
												dataCell.getCellNum(), dataCell.getRegionCell()[1]));
							}

						} else {

							System.out.println("RegionCell参数异常");
						}
					}

					// check列宽
					if (dataCell.getCellWidth() != 0) {

						sheet.setColumnWidth(dataCell.getCellNum(),
								pixCellConst.multiply(new BigDecimal(dataCell.getCellWidth())).intValue());
					}

					// check行高
					if (dataCell.getCellHeight() != 0) {

						row.setHeight(pixRowConst.multiply(new BigDecimal(dataCell.getCellHeight())).shortValue());
					}

					// check字体颜色
					if (CheckUtil.isNotNullOrEmpty(dataCell.getCellColor())) {

						if (dataCell.getCellColor().length == 3) {

							if (CheckUtil.isNotNullOrEmpty(dataCell.getCellColor()[0])
									&& CheckUtil.isNotNullOrEmpty(dataCell.getCellColor()[1])
									&& CheckUtil.isNotNullOrEmpty(dataCell.getCellColor()[2])
									&& ((dataCell.getCellColor()[0] >= 0) || (dataCell.getCellColor()[0] <= 255))
									&& ((dataCell.getCellColor()[1] >= 0) || (dataCell.getCellColor()[1] <= 255))
									&& ((dataCell.getCellColor()[2] >= 0) || (dataCell.getCellColor()[2] <= 255))) {

								fontColor = new XSSFColor(new Color(dataCell.getCellColor()[0],
										dataCell.getCellColor()[1], dataCell.getCellColor()[2]));

								font.setColor(fontColor);
							}
						}
					}

					// check背景色
					if (CheckUtil.isNotNullOrEmpty(dataCell.getBackColor())) {

						if (dataCell.getBackColor().length == 3) {

							if (CheckUtil.isNotNullOrEmpty(dataCell.getBackColor()[0])
									&& CheckUtil.isNotNullOrEmpty(dataCell.getBackColor()[1])
									&& CheckUtil.isNotNullOrEmpty(dataCell.getBackColor()[2])
									&& ((dataCell.getBackColor()[0] >= 0) || (dataCell.getBackColor()[0] <= 255))
									&& ((dataCell.getBackColor()[1] >= 0) || (dataCell.getBackColor()[1] <= 255))
									&& ((dataCell.getBackColor()[2] >= 0) || (dataCell.getBackColor()[2] <= 255))) {

								backColor = new XSSFColor(new Color(dataCell.getBackColor()[0],
										dataCell.getBackColor()[1], dataCell.getBackColor()[2]));

								setBorder.setFillPattern(FillPatternType.SOLID_FOREGROUND);
								setBorder.setFillForegroundColor(backColor);
							}
						}
					}

					// check边框
					if (CheckUtil.isNotNullOrEmpty(dataCell.getBorderLine())) {

						if (dataCell.getBorderLine().length == 4) {

							setBorder.setBorderTop(dataCell.getBorderLine()[0]);
							setBorder.setBorderBottom(dataCell.getBorderLine()[1]);
							setBorder.setBorderLeft(dataCell.getBorderLine()[2]);
							setBorder.setBorderRight(dataCell.getBorderLine()[3]);
						}
					}

					// check字体
					if (CheckUtil.isNotNullOrEmpty(dataCell.getFontName())) {

						font.setFontName(dataCell.getFontName());
					} else {

						font.setFontName("宋体");
					}

					// check字体大小
					if (dataCell.getFontSize() != 0) {

						font.setFontHeightInPoints(dataCell.getFontSize());
					} else {

						font.setFontHeightInPoints((short) 10);
					}

					// 字体是否加粗
					if (dataCell.isBoldweight()) {

						font.setBold(true);
					}

					if (dataCell.isWrapText()) {

						setBorder.setWrapText(dataCell.isWrapText());
					}

					if (CheckUtil.isNotNullOrEmpty(dataCell.getCellValue())) {

						cell.setCellValue(dataCell.getCellValue());
					} else {

						cell.setCellValue("");
					}

					if (CheckUtil.isNotNullOrEmpty(dataCell.getAlignment())) {

						setBorder.setAlignment(dataCell.getAlignment());
					}

					setBorder.setFont(font);
					cell.setCellStyle(setBorder);
					System.out.println(dataSheet.getSheetName() + "->Row:" + dataCell.getRowNum() + "->Cell:"
							+ dataCell.getCellNum() + "->End");
				}
			}
		}

		// lets write the excel data to file now
		File file = new File("SB");
		FileOutputStream fos = new FileOutputStream(file);
		file.createNewFile();
		workbook.write(fos);
		fos.close();
		workbook.close();
		is = new FileInputStream(file);
		return is;

	}
}
