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
<img src='https://img.shields.io/badge/gif_transparency-2.0.0-lightgrey'> | 유저 비밀번호 암호화
<img src='https://img.shields.io/badge/uuid-2.0.0-lightgrey'> | UUID 생성
<img src='https://img.shields.io/badge/image_to_base64-1.0.2-lightgrey'> | 이미지를 base64로 변환
<img src='https://img.shields.io/badge/sharp-0.31.3-lightgrey'> | 이미지 크기 변경 
<img src='https://img.shields.io/badge/redux-8.0.5-lightgrey'> | 컴포턴트 밖에서 상태 관리 
<img src='https://img.shields.io/badge/redux/toolkit-1.9.1-lightgrey'>  | Redux 개발 도구
<img src='https://img.shields.io/badge/socket.io-4.5.4-lightgrey'>  | 웹소켓 기술을 활용
<img src='https://img.shields.io/badge/webgl_utils-1.0.1-lightgrey'> | webgl 관련 라이브러리


## 4. 포스터

<p align=”center”><img src="https://user-images.githubusercontent.com/48302257/215937435-522d319a-b9ce-492a-a2d3-5f0da0b7a9ab.png" width="65%"></p>
