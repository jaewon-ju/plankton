package plankton.backend.controller;

import jakarta.validation.Valid;
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
import org.springframework.web.multipart.MultipartFile;
import plankton.backend.dto.PostDTO;
import plankton.backend.dto.request.PostRequest;
import plankton.backend.dto.response.SuccessResponse;
import plankton.backend.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private List<Subscription> subscriptions = new ArrayList<>(); // 메모리에 구독 정보 저장

    private String publicKey = "MYPUBLICKEY"; // ToDo

    private String privateKey = "MYPRIVATEKEY"; //ToDo

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

        String payload = postRequest.getTitle() + " " +postRequest.getContent();
        subscriptions.forEach(subscription -> sendPushNotification(subscription, payload));
        return new ResponseEntity<>("Notifications sent!", HttpStatus.OK);
    }

    @PostMapping("/save-subscription")
    public ResponseEntity<?> saveSubscription(@RequestBody Subscription subscription) {
        subscriptions.add(subscription);
        return ResponseEntity.status(200).body("Subscription saved.");
    }

    private void sendPushNotification(Subscription subscription, String payload) {
        try {
            PushService pushService = new PushService(publicKey, privateKey);
            Notification notification = new Notification(subscription.getEndpoint(), subscription.getKeys().getP256dh(),
                    subscription.getKeys().getAuth(), payload);
            pushService.send(notification);
            System.out.println("Notification sent to: " + subscription.getEndpoint());
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
            System.err.println("Notification error: " + e.getMessage());
        }
    }
}

// Subscription 클래스 (구독 정보 DTO)
class Subscription {
    private String endpoint;
    private Long expirationTime;
    private Keys keys;

    // Getters와 Setters
    public String getEndpoint() {
        return endpoint;
    }

    public Long getExpirationTime() {
        return expirationTime;
    }

    public Keys getKeys() {
        return keys;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public void setExpirationTime(Long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public void setKeys(Keys keys) {
        this.keys = keys;
    }

    public static class Keys {
        private String p256dh;
        private String auth;

        public String getP256dh() {
            return p256dh;
        }

        public String getAuth() {
            return auth;
        }

        public void setP256dh(String p256dh) {
            this.p256dh = p256dh;
        }

        public void setAuth(String auth) {
            this.auth = auth;
        }
    }
}
