package com.paulina.miplaylist.controller;

import com.paulina.miplaylist.model.Video;
import com.paulina.miplaylist.service.VideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService service;

    public VideoController(VideoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Video> getAll() {
        return service.getAllVideos();
    }

    @PostMapping
    public Video add(@RequestBody Video video) {
        return service.addVideo(video);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteVideo(id);
    }
}
