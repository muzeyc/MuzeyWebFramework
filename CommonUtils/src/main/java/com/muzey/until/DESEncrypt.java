package com.muzey.until;

import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class DESEncrypt {

    private static AlgorithmParameterSpec iv = null;// 加密算法的参数接口，IvParameterSpec是它的一个实现
    private static Key key = null;

    public static String decrypt(String text) {

        return decrypt(text, "muzey");
    }

    public static String decrypt(String text, String sKey) {

        String resStr = "";

        try {

            byte[] DESkey = "muzey".getBytes("UTF-8");// 设置密钥，略去
            byte[] DESIV = { 0x12, 0x34, 0x56, 0x78, (byte) 0x90, (byte) 0xAB, (byte) 0xCD, (byte) 0xEF };// 设置向量，略去
            DESKeySpec keySpec = new DESKeySpec(DESkey);// 设置密钥参数
            iv = new IvParameterSpec(DESIV);// 设置向量
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");// 获得密钥工厂
            key = keyFactory.generateSecret(keySpec);// 得到密钥对象

            Cipher deCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
            deCipher.init(Cipher.DECRYPT_MODE, key, iv);
            BASE64Decoder base64Decoder = new BASE64Decoder();

            byte[] pasByte = deCipher.doFinal(base64Decoder.decodeBuffer(text));

            resStr = new String(pasByte, "UTF-8");
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }

        return resStr;
    }

    public static String encrypt(String text) {

        return encrypt(text, "cz-flower");
    }

    public static String encrypt(String text, String sKey) {

        String resStr = "";

        try {
            byte[] DESkey = "muzeyweb".getBytes("UTF-8");// 设置密钥，略去
            byte[] DESIV = { 0x12, 0x34, 0x56, 0x78, (byte) 0x90, (byte) 0xAB, (byte) 0xCD, (byte) 0xEF };// 设置向量，略去
            DESKeySpec keySpec = new DESKeySpec(DESkey);// 设置密钥参数
            iv = new IvParameterSpec(DESIV);// 设置向量
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");// 获得密钥工厂
            key = keyFactory.generateSecret(keySpec);// 得到密钥对象

            Cipher enCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");// 得到加密对象Cipher
            enCipher.init(Cipher.ENCRYPT_MODE, key, iv);// 设置工作模式为加密模式，给出密钥和向量
            byte[] pasByte = enCipher.doFinal(text.getBytes("utf-8"));
            BASE64Encoder base64Encoder = new BASE64Encoder();
            resStr = base64Encoder.encode(pasByte);
        } catch (Exception e) {

            System.err.println(e.getMessage());
        }

        return resStr;
    }
}
