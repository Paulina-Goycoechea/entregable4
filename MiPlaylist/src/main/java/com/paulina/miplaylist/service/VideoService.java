package com.paulina.miplaylist.service;

import com.paulina.miplaylist.model.Video;
import com.paulina.miplaylist.repository.VideoJsonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Video addVideo(Video video) {
        video.setId(UUID.randomUUID().toString());
        video.setArtist("Unknown");

        // Mini extra: generar thumbnail automáticamente
        video.setThumbnail("https://img.youtube.com/vi/" + extractYoutubeId(video.getUrl()) + "/0.jpg");

        videos.add(0, video);
        repo.saveVideos(videos);
        return video;
    }

    public void deleteVideo(String id) {
        videos.removeIf(v -> v.getId().equals(id));
        repo.saveVideos(videos);
    }

    private String extractYoutubeId(String url) {
        try {
            return url.split("v=")[1];
        } catch (Exception e) {
            return "default";
        }
    }
}
