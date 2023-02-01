# 📸 PicPiCo

### SW 정글 5기 나만의 무기

프로젝트 기간: 2022.12.22 ~ 2023.01.28

팀원: [강성우](https://github.com/midnightkang), [김재현](https://github.com/jaehyeonkim2358), [이원희](https://github.com/2wheeh), [정나린](https://github.com/jnl1128), [최다봄](https://github.com/choidabom)

## 1. 소개

*PicPiCo : take Pictures with Peer Connection*

**‘친구들과 실제로 만나서 즉석 사진 찍고 꾸미기’를 모바일 App으로 !**

## 2. 주요 기능

1. **음성 채팅 (Peer to Peer - N:N Mesh 구현)**
    - 각 페이지 전반에 걸친 음성 채팅 기능
    
2. **사진 찍는 PicPiCo Booth**
    - **배경이 제거된 참여자들의 화상 ⇒ 한 프레임에 합성**
    - 참여자 리스트 **Drag and Drop**으로 참여자 앞 뒤 위치 조절
    - **사진 촬영 버튼**
    - 음소거 및 촬영 횟수 동기화
    - 카카오톡 API를 활용한 참여자 리스트 확인
    - 링크 모달로 카카오톡 공유하기
    
3. **사진 고르는 Select Pic**
    - 수정 ~
    
4.  **사진 꾸미는 Decoration**

<img src="https://user-images.githubusercontent.com/48302257/215937547-400e3b3f-bc72-4b80-a1d1-b6eed4a13c74.png"  width="80%">


## 3. 개발 환경

**Backend**

- Node.js 18.13.0
- Nest.js

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

## 4. 포스터

<img src="https://user-images.githubusercontent.com/48302257/215937435-522d319a-b9ce-492a-a2d3-5f0da0b7a9ab.png"  width="80%">
