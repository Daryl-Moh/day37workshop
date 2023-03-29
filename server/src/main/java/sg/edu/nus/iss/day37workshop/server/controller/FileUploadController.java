package sg.edu.nus.iss.day37workshop.server.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.day37workshop.server.service.FileUploadService;

@Controller
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadSvc;

    
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, 
                                produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> upload(
            @RequestPart MultipartFile imageFile,
            @RequestPart String title,
            @RequestPart String complain
    ){
        String key;
        JsonObject jsonPayload = null;

        try {

            key = this.fileUploadSvc.upload(imageFile);

            jsonPayload = Json.createObjectBuilder()
                    .add("image-key", key)
                    .build();

        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(jsonPayload.toString());
        return ResponseEntity.ok(jsonPayload.toString());
    }

    @PostMapping(path="/uploadSQL", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadSQL(@RequestPart MultipartFile myFile, @RequestPart String name, Model model) {
        String key = "";
        System.out.printf("name >>> %s\n", name);
        try {
            key = fileUploadSvc.upload(myFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        model.addAttribute("name", name);
        model.addAttribute("file", myFile);
        model.addAttribute("key", key);

        return "upload";
    }

}
