package com.example.Strange505.board.dto;

import com.example.Strange505.board.domain.Comment;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MypageCommentResponseDto implements Serializable {

    private Long id;
    private Long articleId;
    private String content;
    private Long parentId;
    private String nickName;
    private Integer gen;
    private String local;
    private LocalDateTime createTime;
    private LocalDateTime modifyTime;
    private List<MypageCommentResponseDto> children;
    private String articleTitle;
    private String boardName;
    private Long boardId;

}
