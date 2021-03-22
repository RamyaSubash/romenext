package com.els.romenext.web.general.utils.security;

import java.security.MessageDigest;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
//import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang3.RandomStringUtils;

public class AESEncryptor {

	/**
	 * As defined by the encryption logic 
	 * 
	 * Algorithm to use for Encryption:
	 * 1.	For encryption use Java AES algorithm with 128 bit key.
	 * 2.	Create SHA-256 message digest of Private key.
	 * 3.	Generate secrete key using 16 bytes from above constructed message digest.
	 * 4.	Use UTF-8 as charset for generation of bytes array.
	 * 
	 * 
	 * @param key
	 * @return
	 * @throws Exception 
	 */
	public static String encrypt( String msg, String secretKey ) throws Exception {
		
		
		byte[] enckey = secretKey.getBytes("UTF-8");
		
		MessageDigest sha = MessageDigest.getInstance("SHA-256");
		enckey = sha.digest( enckey );
		
		enckey = Arrays.copyOf( enckey,  16 );
		
		byte[] finalAuthKey = AESEncryptor.encrypt( msg,  enckey );		
		
		String encodeBase64String = Base64.encodeBase64String( finalAuthKey );
		return encodeBase64String;
	}
	
	
	
	
	public static String decrypt( String encryptedMsg, String secretKey ) throws Exception {
		
		byte[] encAuthKey = Base64.decodeBase64( encryptedMsg );
		byte[] enckey = secretKey.getBytes("UTF-8");
		
		MessageDigest sha = MessageDigest.getInstance("SHA-256");
		enckey = sha.digest( enckey );
		
		enckey = Arrays.copyOf( enckey,  16 );
		
		byte[] finalAuthKey = AESEncryptor.decrypt( encAuthKey,  enckey );		
		
		String simpleString = new String( finalAuthKey );
		return simpleString;
	}
	
	
	
	
	public static String generateSalt( int size ) {
		return RandomStringUtils.randomAlphanumeric( size );
	}

	private static byte[] encrypt(String plainText, byte[] passkey) throws Exception {
        Cipher cipher = Cipher.getInstance( "AES/CBC/PKCS5Padding" );
        SecretKeySpec key = new SecretKeySpec(passkey, "AES");
        cipher.init(Cipher.ENCRYPT_MODE, key, 
        		new IvParameterSpec(new byte[cipher.getBlockSize()]));
        return cipher.doFinal(plainText.getBytes());
    }
	
	private static byte[] decrypt(byte[] encryptedText, byte[] passkey) throws Exception {
        Cipher cipher = Cipher.getInstance( "AES/CBC/PKCS5Padding" );
        SecretKeySpec key = new SecretKeySpec(passkey, "AES");
        cipher.init(Cipher.DECRYPT_MODE, key, 
        		new IvParameterSpec(new byte[cipher.getBlockSize()]));
        return cipher.doFinal( encryptedText );
    }
	
	public static void main(String[] args) {
		
	}
	
}
