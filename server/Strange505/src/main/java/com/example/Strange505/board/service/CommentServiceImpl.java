package com.example.Strange505.board.service;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.domain.Comment;
import com.example.Strange505.board.dto.CommentRequestDto;
import com.example.Strange505.board.dto.CommentResponseDto;
import com.example.Strange505.board.repository.ArticleRepository;
import com.example.Strange505.board.repository.CommentRepository;
import com.example.Strange505.user.domain.User;
import com.example.Strange505.user.repository.UserRepository;
import com.example.Strange505.user.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Override
    public CommentResponseDto createComment(Long userId, CommentRequestDto dto) {
        Article article = articleRepository.getReferenceById(dto.getArticleId());
        Comment parent = commentRepository.findById(dto.getParentId()).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        Comment comment = Comment.builder()
                .article(article)
                .content(dto.getContent())
                .createTime(LocalDateTime.now())
                .parent(parent)
                .user(user)
                .build();
        Comment savedComment = commentRepository.save(comment);
        return new CommentResponseDto(savedComment);
    }

    @Override
    public CommentResponseDto getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(()->new RuntimeException("Comment not found"));
        Comment parent = comment.getParent();
        if(parent == null) {
            return CommentResponseDto.builder()
                    .userId(comment.getUser().getId())
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .build();
        } else {
            return CommentResponseDto.builder()
                    .userId(comment.getUser().getId())
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .parent(comment.getParent())
                    .build();
        }
    }

    @Override
    public List<CommentResponseDto> getCommentByArticle(Long articleId) {
        List<Comment> list = commentRepository.searchByArticle(articleId);
        List<CommentResponseDto> dtoList = new ArrayList<>();
        list.stream().forEach(findByArticle -> dtoList.add(new CommentResponseDto(
                findByArticle.getUser().getId(), findByArticle.getArticle().getId(),
                findByArticle.getContent(), findByArticle.getParent())));
        return dtoList;
    }

    @Override
    public List<CommentResponseDto> getCommentByUser(Long userId) {
        List<Comment> list = commentRepository.searchByUser(userId);
        List<CommentResponseDto> dtoList = new ArrayList<>();
        list.stream().forEach(findByArticle -> dtoList.add(new CommentResponseDto(
                findByArticle.getUser().getId(), findByArticle.getArticle().getId(),
                findByArticle.getContent(), findByArticle.getParent())));
        return dtoList;
    }

    @Override
    public CommentResponseDto updateComment(Long id, CommentRequestDto dto) {
        Comment comment = commentRepository.findById(id).orElseThrow(()->new RuntimeException("Comment not found"));
        comment.update(dto.getContent(), LocalDateTime.now());
        Comment save = commentRepository.save(comment);
        return new CommentResponseDto(save);
    }

    @Override
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException());
        comment.remove();

        List<Comment> removableCommentList = comment.findRemovableList();
        log.info("removeList = {}", removableCommentList);
        commentRepository.deleteAll(removableCommentList);
        System.out.println("서비스단");
    }
}
