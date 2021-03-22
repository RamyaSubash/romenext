package com.els.romenext.web.general.utils;

import java.security.SecureRandom;

import org.mindrot.jbcrypt.BCrypt;


public class PasswordUtils {
	
    private static String VALID_CHARS_LCASE  = "abcdefghijklmnopqrstuvwxyz";
    private static String VALID_CHARS_UCASE  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static String VALID_CHARS_NUMERIC= "1234567890";
	
	/**
	 * Plan password will be validated against the hashed version
	 * @param password
	 * @param hashedPassword
	 * @return boolean
	 */
	public static boolean checkPassword(String password, String hashedPassword) {
		return BCrypt.checkpw(password, hashedPassword);
	}

	/**
	 * 
	 * @param rawPassword
	 * @return String
	 */
	public static String hashPassword(String rawPassword) {
		return BCrypt.hashpw(rawPassword, BCrypt.gensalt());
	}
	
	public static String generateValidPassword(int length) {
		// Reference http://www.obviex.com/Samples/Password.aspx
		char[] validChars = (VALID_CHARS_LCASE + VALID_CHARS_UCASE + VALID_CHARS_NUMERIC).toCharArray();

		SecureRandom randomGenerator = new SecureRandom();
		
		char[] passwordChars = new char[length];
		
		for (int i = 0, charPos; i < passwordChars.length; i++) {
			charPos = randomGenerator.nextInt(validChars.length);
			passwordChars[i] = validChars[charPos];
		}
		
		return String.valueOf(passwordChars);
	}

	public static void fillBySecureRandom(byte[] randomArray) {
		SecureRandom randomGenerator = new SecureRandom();
		randomGenerator.nextBytes(randomArray);
	}
	
	public static int getIntBySecureRandom(int maxValue) {
		SecureRandom randomGenerator = new SecureRandom();
		return randomGenerator.nextInt(maxValue);
	}
}