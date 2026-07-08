package com.suryakanta.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ScanRequest {

    @NotBlank(message = "URL Required")
    @Pattern(
            regexp = "^(https?://)([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(/.*)?$",
            message = "Please enter a valid website URL starting with http:// or https://"
    )

    private String url;

    public String getUrl(){
        return url;
    }

    public void setUrl(String url){
        this.url = url;
    }
}
