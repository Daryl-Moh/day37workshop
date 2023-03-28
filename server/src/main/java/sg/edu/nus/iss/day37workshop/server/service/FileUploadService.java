package sg.edu.nus.iss.day37workshop.server.service;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class FileUploadService {

    @Value("${do.storage.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public String upload(MultipartFile file) throws IOException {
        
        // create user data
        Map<String, String> userData = new HashMap<>();
        userData.put("name", "Bocchi");
        userData.put("uploadTime", Instant.now().toString());
        userData.put("originalFilename", file.getOriginalFilename());

        // creating the metadata and pass in the user data as well
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        metadata.setUserMetadata(userData);

        // generate a userID
        String key = UUID.randomUUID().toString()
                .substring(0, 8);

        String finalfileUpload = "";
        finalfileUpload = key + ".png";

        PutObjectRequest putRequest = 
            new PutObjectRequest(
                bucketName, 
                "myobject/%s.%s".formatted(key, finalfileUpload), 
                file.getInputStream(), 
                metadata
            );    

        putRequest.withCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(putRequest);
        return "myobject/%s.%s".formatted(key, finalfileUpload);
    }
}
