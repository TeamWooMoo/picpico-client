# 📸 PicPiCo

### SW 정글 5기 나만의 무기

프로젝트 기간: 2022.12.22 ~ 2023.01.28

팀원: [강성우](https://github.com/midnightkang), [김재현](https://github.com/jaehyeonkim2358), [이원희](https://github.com/2wheeh), [정나린](https://github.com/jnl1128), [최다봄](https://github.com/choidabom)

## 1. 소개

*PicPiCo : take Pictures with Peer Connection*

**‘친구들과 실제로 만나서 즉석 사진 찍고 꾸미기’를 모바일 App으로 !**
<p align=”center”><img width="80%" src="https://user-images.githubusercontent.com/48302257/215937547-400e3b3f-bc72-4b80-a1d1-b6eed4a13c74.png"/></p>


## 2. 주요 기능

### 1. **음성 채팅 (Peer to Peer - N:N Mesh 구현)**
📍 각 페이지 전반에 걸친 음성 채팅 기능
    
### 2. **사진 찍는 PicPiCo Booth**
|Drag and Drop 시연|PicPiCo Booth 주요 기능|
|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215983465-d63a0653-c7f9-4577-a07f-b50f15b29a08.gif"></p>|📍 실제로 같이 있는 것처럼 합성된 캠화면 제공 <br><br> 📍 카카오톡 API를 활용한 참여자 리스트 확인 <br><br> 📍 참여자 리스트 상 순서에 따라 화면에서 참여자들의 앞, 뒤 순서가 정해짐 <br><br> 📍  **Drag and Drop**으로 이 순서를 조작 가능 <br><br> 📍 참여자간 음소거 여부 및 촬영 횟수 **동기화** <br><br> 📍 링크 모달로 카카오톡 공유하기 |
    
    
### 3. **사진 고르는 Select Pic**

📍 참여자(방장)가 촬영한 사진 중 Best 4컷 선택

### 4.  **사진 꾸미는 Decoration**
|Drawing 시연|Sticker 시연|Decoration 주요 기능|
|:---:|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215988148-8e2b9073-7ec3-415d-9c73-4407ab3fe6be.gif"></p>|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215988466-ac8ec178-abfe-4f24-86ee-4d18d678c1d7.gif"></p>| 📍 각 참여자가 어떤 사진을 꾸미고 있는 지 실시간 공유 <br> (**상단 닉네임 폰트 색 == 꾸미고 있는 사진 테두리의 색**) <br><br> 📍그리기 및 GIF 스티커 붙이기 동시 작업 지원 <br><br> 📍 가상 배경 추가 가능  |
    
### 5. **GIF 결과를 확인하는 Download**
|GIF Download 시연|Download Page 주요 기능|
|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215992957-8d00d3ee-07d0-4263-88f3-c0bc7aced86a.gif"></p>|📍 꾸민 결과가 화면상에 보여지고, GIF형식으로 유저 각자의 로컬에 저장 가능  <br><br> 📍 모바일 환경에서는 기기의 사양에 따라 GIF 생성 완료까지 20~30초 시간 소요 <br><br> 📍  GIF 생성이 완료되면 다운로드 버튼이 나타남|

## 3. 기술 스택과 라이브러리

### 1. **기술 스택**

기술스택 | 설명
---|:---:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | 자바스크립트 런타임
![Nest.js](https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) | 웹프레임워크
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) | 인메모리 저장소 (캐시)
![WebRTC](https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white) | 화상 공유 및 음성 채팅(N:N Mesh)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white) | 시그널링, 룸 입장, 사진 촬영 및 꾸미기 이벤트 처리
![NginX](https://img.shields.io/badge/nginx-green?style=for-the-badge&logo=nginx&logoColor=white) | Proxy 서버 
![COTURN](https://img.shields.io/badge/coturn-333333?style=for-the-badge) | 자체 TURN 서버 구축

### 2. **주요 라이브러리** 
라이브러리 | 설명
---|:---:
<img src='https://img.shields.io/badge/react-9.3.1-lightgrey'> | javascript 라이브러리
<img src='https://img.shields.io/badge/mediapipe/selfie_segmentation-0.1.16-lightgrey'> | 배경 제거를 위한 인물 segmentation
<img src='https://img.shields.io/badge/gif_transparency-2.0.0-lightgrey'> | 유저 비밀번호 암호화
<img src='https://img.shields.io/badge/uuid-2.0.0-lightgrey'> | UUID 생성
<img src='https://img.shields.io/badge/image_to_base64-1.0.2-lightgrey'> | 이미지를 base64로 변환
<img src='https://img.shields.io/badge/sharp-0.31.3-lightgrey'> | 이미지 크기 변경 
<img src='https://img.shields.io/badge/redux-8.0.5-lightgrey'> | 컴포넌트간 상태 관리
<img src='https://img.shields.io/badge/redux/toolkit-1.9.1-lightgrey'>  | 컴포넌트간 상태 관리
<img src='https://img.shields.io/badge/socket.io-4.5.4-lightgrey'>  | 웹소켓 기술을 활용
<img src='https://img.shields.io/badge/webgl_utils-1.0.1-lightgrey'> | webgl 관련 라이브러리


## 4. 시작하기
### BE

[Nginx 설치와 설정, 실행](https://www.notion.so/Nginx-25887e5fc64d4e74b6051cc0cd3ac3df)

[Redis 설치와 실행](https://www.notion.so/Redis-cb46d7742ab443c69ec69db756300844)

```bash
$ git clone https://github.com/TeamWooMoo/picpico-server.git

$ cd picpico-server

$ npm i

$ npm run start
```

### FE

[Nginx 설치와 설정, 실행](https://www.notion.so/Nginx-25887e5fc64d4e74b6051cc0cd3ac3df)

```bash
$ git clone https://github.com/TeamWooMoo/picpico-client.git

$ cd picpico-client/front-src

$ npm i

$ npm run build

$ cd ..

$ npm i

$ npm run start
```


## 5. 포스터

<p align=”center”><img src="https://user-images.githubusercontent.com/48302257/215937435-522d319a-b9ce-492a-a2d3-5f0da0b7a9ab.png" width="100%"></p>
