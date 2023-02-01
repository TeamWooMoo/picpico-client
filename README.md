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
- 각 페이지 전반에 걸친 음성 채팅 기능
    
### 2. **사진 찍는 PicPiCo Booth**
|Drag and Drop 시연|PicPiCo Booth 주요 기능|
|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215983465-d63a0653-c7f9-4577-a07f-b50f15b29a08.gif"></p>|📍 Drag and Drop 시연 화면 상단의 참여자 리스트를 확인하여 이름 위치 순서가 바뀜에 따라 화면의 앞 뒤가 바뀌는 것을 확인할 수 있습니다. <br><br> 1. **배경이 제거된 참여자들의 화상 ⇒ 한 프레임에 합성** <br><br> 2. 참여자 리스트 **Drag and Drop**으로 참여자 앞 뒤 위치 조절 <br><br> 3. **사진 촬영 버튼** <br><br> 4. 음소거 및 촬영 횟수 동기화 <br><br> 5. 카카오톡 API를 활용한 참여자 리스트 확인 <br><br> 6. 링크 모달로 카카오톡 공유하기 |
    
    
### 3. **사진 고르는 Select Pic**
- list 내의 사진 ⇒ 드래그를 통해 확인 가능
- 참여자(방장)가 선택하는 사진의 프레임 색 변경

### 4.  **사진 꾸미는 Decoration**
|Drawing 시연|Sticker 시연|Decoration 주요 기능|
|:---:|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215988148-8e2b9073-7ec3-415d-9c73-4407ab3fe6be.gif"></p>|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215988466-ac8ec178-abfe-4f24-86ee-4d18d678c1d7.gif"></p>| 1. 참여자의 이름 폰트 색과 각자 편집하고 있는 사진의 프레임 색 동기화 <br><br> 2. 동시 그리기 <br><br> 3. GIF 스티커 이동 <br><br> 4. 배경 추가 기능  |
    
### 5. **GIF 결과를 확인하는 Download**
|GIF Download 시연|Download Page 주요 기능|
|:---:|:---|
|<p align="center"><img width="65%" src="https://user-images.githubusercontent.com/48302257/215992957-8d00d3ee-07d0-4263-88f3-c0bc7aced86a.gif"></p>|📍 GIF 생성 후, 생성된 GIF를 각자의 로컬에 저장할 수 있습니다. 모바일 환경은 기기의 사양에 따라 GIF 생성에 20~30초 정도의 시간이 걸립니다. <br><br> 1. 기기에 GIF 다운로드 가능 <br><br> 2.  새로고침 버튼으로 홈 화면 이동|

## 3. 개발 환경

**Backend**

- Node.js 18.13.0 : 자바스크립트 런타임
- Nest.js : 웹 프레임워크
- REDIS : 인메모리 저장소 (캐시)
- Web RTC :  **화상 공유 및 음성 채팅** (N:N Mesh)
- SOCKET.IO : 시그널링, 룸 입장, 사진 촬영 및 꾸미기 이벤트 처리

**Frontend**

- React 9.3.1
- Redux-toolkit 1.9.1

**Web RTC**

- N:N Mesh

**CI/CD**

- Visual Studio Code
- AWS EC2
- Redis-server v7.0.7
- nginx
- COTURN : 자체 TURN 서버 구축

**주요 라이브러리** 
라이브러리 | 설명
---|:---:
<img src='https://img.shields.io/badge/mediapipe/selfie_segmentation-0.1.16-lightgrey'> | 배경 제거를 위한 인물 segmentation
<img src='https://img.shields.io/badge/gif-transparency-2.0.0-lightgrey'> | 유저 비밀번호 암호화
<img src='https://img.shields.io/badge/gifuct-js-2.1.2-lightgrey'> | 리소스 공유 CORS 정책 설정
<img src='https://img.shields.io/badge/uuid-2.0.0-lightgrey'>  | 환경변수 관리
<img src='https://img.shields.io/badge/cross--env-7.0.3-lightgrey'>  | 스크립트 실행 환경변수 설정
<img src='https://img.shields.io/badge/express-4.18.1-lightgrey'> | 서버 프레임워크
<img src='https://img.shields.io/badge/helmet-5.1.0-lightgrey'>  | 서버 보안 취약점 방어
<img src='https://img.shields.io/badge/redis-3.1.2-lightgrey'>  | Redis Cli
<img src='https://img.shields.io/badge/redis--delete--pattern-0.1.0-lightgrey'>  | Redis 키 패턴 삭제
<img src='https://img.shields.io/badge/nodemailer-6.7.7-lightgrey'>  | 유저에게 메일 전송
<img src='https://img.shields.io/badge/multer--s3-2.10.0-lightgrey'>  | S3 버킷 이미지 업로드
<img src='https://img.shields.io/badge/joi-17.4.1-lightgrey'>  | 유효성 검사
<img src='https://img.shields.io/badge/jest-28.1.3-lightgrey'>  | 테스트 코드
<img src='https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey'>  | 토큰 암호화
<img src='https://img.shields.io/badge/cookie--parser-1.4.6-lightgrey'>  | 서버 - 클라이언트 간 쿠키 파싱
<img src='https://img.shields.io/badge/moment-2.29.1-lightgrey'> | Datetime 자료형 관리
<img src='https://img.shields.io/badge/morgan-1.10.0-lightgrey'> | HTTP 로그 기록
<img src='https://img.shields.io/badge/uuid-8.3.2-lightgrey'> | UUID 생성
<img src='https://img.shields.io/badge/winston-3.8.1-lightgrey'> | 로그 파일 생성
<img src='https://img.shields.io/badge/winston--daily--rotate--file-4.7.1-lightgrey'> | 로그 파일 관리
<img src='https://img.shields.io/badge/mysql-2.18.1-lightgrey'> | MySQL 연동
<img src='https://img.shields.io/badge/sequelize-6.21.2-lightgrey'>  | MySQL ORM
<img src='https://img.shields.io/badge/sequelize--cli-6.4.1-lightgrey'> | MySQL ORM 콘솔
- mediapipe/selfie_segmentation 0.1.16 : 배경 제거를 위한 인물 segmentation
- gif-transparency 2.0.0 : gif 생성
- gifuct-js 2.1.2 : 꾸미기에 사용된 gif의 frame 정보 parsing
- uuid 2.0.0
- image-to-base64 1.0.2
- sharp 0.31.3
- react-redux 8.0.5
- reduxjs/toolkit 1.9.1
- socket.io-client 4.5.4
- webgl-utils 1.0.1

## 4. 포스터

<p align=”center”><img src="https://user-images.githubusercontent.com/48302257/215937435-522d319a-b9ce-492a-a2d3-5f0da0b7a9ab.png" width="65%"></p>
