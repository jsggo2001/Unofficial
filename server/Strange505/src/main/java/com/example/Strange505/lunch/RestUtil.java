package com.example.Strange505.lunch;

import com.example.Strange505.lunch.responseDTO.FreshMealDTO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

public class RestUtil {
    public static String requestGet(String apiUrl, Map<String, String> header) throws Exception {
        HttpURLConnection conn = null;
        StringBuffer response = new StringBuffer();

        //URL 설정
        URL url = new URL(apiUrl);
        conn = (HttpURLConnection) url.openConnection();

        //Request header 설정
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json");


        for (String key: header.keySet()) {
            conn.setRequestProperty(key, header.get(key));
        }

        //request에 JSON data 준비
        conn.setDoOutput(true);

        //보내고 결과값 받기
        int responseCode = conn.getResponseCode();

        if (responseCode == 400) {
            System.out.println("400:: 해당 명령을 실행할 수 없음");
        } else if (responseCode == 401) {
            System.out.println("401:: Authorization가 잘못됨");
        } else if (responseCode == 500) {
            System.out.println("500:: 서버 에러, 문의 필요");
        } else { // 성공 후 응답 JSON 데이터받기

            Charset charset = Charset.forName("UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader((InputStream) conn.getContent(), charset));

            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
        }

        return response.toString();
    }
}
