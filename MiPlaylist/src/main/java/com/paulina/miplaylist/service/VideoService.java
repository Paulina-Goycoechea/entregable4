package com.paulina.miplaylist.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.paulina.miplaylist.model.Video;
import com.paulina.miplaylist.repository.VideoJsonRepository;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class VideoService {

    private final VideoJsonRepository repo;
    private List<Video> videos;

    public VideoService(VideoJsonRepository repo) {
        this.repo = repo;
        this.videos = repo.loadVideos();
    }

    public List<Video> getAllVideos() {
        return videos;
    }

    /*
    public Video addVideo(Video video) {
        video.setId(UUID.randomUUID().toString());

        // 1. Thumbnail
        String youtubeId = extractYoutubeId(video.getUrl());
        video.setThumbnail("https://img.youtube.com/vi/" + youtubeId + "/0.jpg");

        // 2. Obtener artista real desde YouTube oembed
        try {
            String apiUrl = "https://www.youtube.com/oembed?url=" + video.getUrl() + "&format=json";
            ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
            Map<String, Object> data = mapper.readValue(new URL(apiUrl), Map.class);

            String author = (String) data.get("author_name");
            video.setArtist(author != null ? author : "Unknown");

        } catch (Exception e) {
            video.setArtist("Unknown");
        }

        videos.add(0, video);
        repo.saveVideos(videos);
        return video;
    }*/


    public void deleteVideo(String id) {
        videos.removeIf(v -> v.getId().equals(id));
        repo.saveVideos(videos);
    }

    private String extractYoutubeId(String url) {
        try {
            // Caso típico ?v=ID
            if (url.contains("v=")) {
                String id = url.split("v=")[1];
                if (id.contains("&")) {
                    id = id.split("&")[0]; // cortar parámetros extras
                }
                return id;
            }

            // Caso youtu.be/ID
            if (url.contains("youtu.be/")) {
                return url.substring(url.lastIndexOf("/") + 1);
            }

            return "default";
        } catch (Exception e) {
            return "default";
        }
    }

    public Video updateVideo(String id, Video updated) {
        for (int i = 0; i < videos.size(); i++) {
            if (videos.get(i).getId().equals(id)) {

                Video v = videos.get(i);

                v.setTitle(updated.getTitle());
                v.setUrl(updated.getUrl());
                v.setThumbnail(updated.getThumbnail());
                v.setArtist(updated.getArtist());
                v.setLiked(updated.isLiked());
                v.setFavorite(updated.isFavorite());

                repo.saveVideos(videos);
                return v;
            }
        }
        return null;
    }

    public Video getVideoById(String id) {
        return videos.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Video addVideo(Video video) {
        video.setId(generateId());
        video.setThumbnail(generateThumbnail(video.getUrl()));
        video.setArtist(fetchArtistFromYoutube(video.getUrl()));

        videos.add(0, video);
        repo.saveVideos(videos);

        return video;
    }

    private String generateId() {
        return UUID.randomUUID().toString();
    }

    private String generateThumbnail(String url) {
        String youtubeId = extractYoutubeId(url);
        return "https://img.youtube.com/vi/" + youtubeId + "/0.jpg";
    }

    private String fetchArtistFromYoutube(String url) {
        try {
            String apiUrl = "https://www.youtube.com/oembed?url=" + url + "&format=json";
            ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();

            Map<String, Object> data = mapper.readValue(new URL(apiUrl), Map.class);
            return (String) data.getOrDefault("author_name", "Unknown");

        } catch (Exception e) {
            return "Unknown";
        }
    }


}

