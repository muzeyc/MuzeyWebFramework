package com.muzey.until;

import java.io.File;  
import java.io.FileOutputStream;  
import java.io.IOException;  
import java.io.OutputStream;  
import java.util.ArrayList;  
import java.util.List;  
  
import org.apache.commons.net.ftp.FTPClient;  
import org.apache.commons.net.ftp.FTPFile;  
import org.apache.commons.net.ftp.FTPReply;

/** 
 * 用来操作ftp的综合类。<br/> 
 * 主要依赖jar包commons-net-3.1.jar。 
 *  
 * @author MuzeyC 
 * @date 2017年03月03日
 */  
public class FtpUtil {  
    // ftp 地址  
    private static String url = "law02.gotoftp5.com";  
    // ftp端口  
    private static int port = 21;  
    // 用户名  
    private static String userName = "law02";  
    // 密码  
    private static String password = "lcj428111";   
  
    /** 
     * 从FTP服务器下载指定文件名的文件。 
     *  
     * @param remotePath 
     *            FTP服务器上的相对路径 
     * @param fileName 
     *            要下载的文件名 
     * @param localPath 
     *            下载后保存到本地的路径 
     * @return 成功下载返回true，否则返回false。 
     * @throws IOException 
     * @author MuzeyC 
     * @date 2017年03月03日
     */  
    public static boolean downFile(String remotePath, String fileName, String localPath)  
            throws IOException {  
        boolean success = false;  
        FTPClient ftp = new FTPClient();  
        try {  
            int reply;  
            ftp.connect(url, port);  
            // 如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器  
            ftp.login(userName, password);// 登录  
            reply = ftp.getReplyCode();  
            if (!FTPReply.isPositiveCompletion(reply)) {  
                ftp.disconnect();  
                return success;  
            }  
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录  
            FTPFile[] fs = ftp.listFiles();  
            FTPFile ff;  
            for (int i = 0; i < fs.length; i++) {  
                ff = fs[i];  
                if (null != ff && null != ff.getName()  
                        && ff.getName().equals(fileName)) {  
                    File localFile = new File(localPath + "/" + ff.getName());  
                    OutputStream is = new FileOutputStream(localFile);  
                    ftp.retrieveFile(ff.getName(), is);  
                    is.close();  
                }  
            }  
            ftp.logout();  
            success = true;  
        } catch (IOException e) {  
            e.printStackTrace();  
            throw e;  
        } finally {  
            if (ftp.isConnected()) {  
                try {  
                    ftp.disconnect();  
                } catch (IOException ioe) {  
                }  
            }  
        }  
        return success;  
    }  
  
    /** 
     * 从FTP服务器列出指定文件夹下文件名列表。 
     *  
     * @param remotePath 
     *            FTP服务器上的相对路径 
     * @return List<String> 文件名列表，如果出现异常返回null。 
     * @throws IOException 
     * @author MuzeyC 
     * @date 2017年03月03日
     */  
    public static List<String> getFileNameList(String remotePath) throws IOException {  
        // 目录列表记录  
        List<String> fileNames = new ArrayList<String>();  
        FTPClient ftp = new FTPClient();  
        try {  
            int reply;  
            ftp.connect(url, port);  
            // 如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器  
            ftp.login(userName, password);// 登录  
            reply = ftp.getReplyCode();  
            if (!FTPReply.isPositiveCompletion(reply)) {  
                ftp.disconnect();  
                return null;  
            }  
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录  
            ftp.setControlEncoding("UTF-8");
            FTPFile[] fs = ftp.listFiles();  
            for (FTPFile file : fs) {  
                fileNames.add(file.getName());  
            }  
            ftp.logout();  
        } catch (IOException e) {  
            e.printStackTrace();  
            throw e;  
        } finally {  
            if (ftp.isConnected()) {  
                try {  
                    ftp.disconnect();  
                } catch (IOException ioe) {  
                }  
            }  
        }  
        return fileNames;  
    }  
  
}  
