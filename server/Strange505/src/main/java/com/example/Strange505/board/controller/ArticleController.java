package com.example.Strange505.board.controller;


import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleRequestDto;
import com.example.Strange505.board.dto.ArticleResponseDto;
import com.example.Strange505.board.service.ArticleService;
import com.example.Strange505.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> registerArticle(@RequestHeader("Authorization") String accessToken,
                                             @RequestBody ArticleRequestDto dto) {
        Long userId = authService.extractionID(accessToken);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        articleService.createArticle(dto, userId);
        return new ResponseEntity<>("Article created successfully", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyArticle(@PathVariable Long id, @RequestBody ArticleRequestDto dto) {
        articleService.updateArticle(id, dto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/title")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByTitle(@RequestParam String title, @RequestParam Long boardId) {
        List<Article> articles = articleService.getArticlesByTitle(title, boardId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }


    @GetMapping("/content")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByContent(@RequestParam String content, @RequestParam Long boardId) {
        List<Article> articles = articleService.getArticlesByContent(content, boardId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ArticleResponseDto>> getArticlesByUser(@RequestHeader("Authorization") String accessToken) {
        Long userId = authService.extractionID(accessToken);
        if (userId == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Article> articles = articleService.getArticlesByUser(userId);
        List<ArticleResponseDto> articleResponseDtoList = new ArrayList<>();

        articles.stream().forEach(findArticle -> articleResponseDtoList.add(
                new ArticleResponseDto(findArticle.getTitle(), findArticle.getContent(),
                        findArticle.getBoard().getName(), findArticle.getNickName(),
                        findArticle.getCreateTime(), findArticle.getModifyTime())));

        return new ResponseEntity<>(articleResponseDtoList, HttpStatus.OK);
    }
}
