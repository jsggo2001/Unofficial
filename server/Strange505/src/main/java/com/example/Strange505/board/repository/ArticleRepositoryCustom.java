package com.example.Strange505.board.repository;

import com.example.Strange505.board.domain.Article;
import com.example.Strange505.board.dto.ArticleLikeRequestDto;
import com.example.Strange505.user.domain.User;

import java.util.List;

public interface ArticleRepositoryCustom {
    List<Article> searchByTitleAndContent(String keyword, Long boardId);
    List<Article> searchByUser(Long userId);
    List<Article> searchByBoard(Long boardId);
    void addLikeCount(Article article);
    void subLikeCount(Article article);
}
