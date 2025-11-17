package com.paulina.miplaylist.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paulina.miplaylist.model.Video;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VideoJsonRepository {

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();
    private final String filePath = "src/main/resources/data/videos.json";

    private File getFile() {
        return new File(filePath);
    }

    public List<Video> loadVideos() {
        try {
            File file = getFile();
            if (!file.exists()) {
                file.getParentFile().mkdirs();
                objectMapper.writeValue(file, new ArrayList<>());
            }
            return objectMapper.readValue(file, new TypeReference<List<Video>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Error reading videos.json", e);
        }
    }

    public void saveVideos(List<Video> videos) {
        try {
            objectMapper.writeValue(getFile(), videos);
        } catch (Exception e) {
            throw new RuntimeException("Error writing videos.json", e);
        }
    }
}
