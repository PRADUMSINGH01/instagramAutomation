export const decrypt = ({ encryptedData, iv, authTag }) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
      Buffer.from(iv, "hex")
    );
  
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
  
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
  
    return decrypted;
  };
  