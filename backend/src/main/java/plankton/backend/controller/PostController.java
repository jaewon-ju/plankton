package plankton.backend.controller;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Subscription;
import org.jose4j.lang.JoseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import plankton.backend.dto.PostDTO;
import plankton.backend.dto.request.PostRequest;
import plankton.backend.dto.response.SuccessResponse;
import plankton.backend.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@Slf4j
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private Subscription subscription = null; // 메모리에 구독 정보 저장

    private String publicKey = "BB4P3QAB6tIVb0DBufMf3YQXIpZqPpT30l5YHsevtR09AUvFDQ9cOgIADZa_it1NUAjJeFAx6lRlXhZvPhr42Zo"; // ToDo

    private String privateKey = "aWRI92zsdPlS5cRkgMwQ63PNzEFSxP3m2EMJRQCEE8Y"; //ToDo

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    @Transactional
    @Operation(summary = "Get All Posts", responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = PostDTO.class))),
            @ApiResponse(responseCode = "404", description = "Posts not found",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> getAllPosts() {
        List<PostDTO> postDtoList = postService.getAllPosts();
        return ResponseEntity.ok(postDtoList);
    }

    @PostMapping(value = "/")
    @Transactional
    @Operation(summary = "Create a new Post", responses = {
            @ApiResponse(responseCode = "201", description = "Post created successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = SuccessResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) throws IOException {

        // Post 생성
        PostDTO postDto = PostDTO.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .image("No Image")
                .level(Integer.parseInt(postRequest.getLevel()))
                .createdAt(LocalDateTime.now())
                .eventId(Long.valueOf(postRequest.getEventId()))
                .build();

        postService.createPost(postDto);
        return new ResponseEntity<>("Post Saved To DB", HttpStatus.OK);
    }
}