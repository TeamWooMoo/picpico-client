import { KakaoShareKey } from "../../config";

export const shareKakao = route => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(KakaoShareKey);
    }

    kakao.Link.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: "픽피코 초대장", // 인자값으로 받은 title
        description: "떨어져 있어도 같이 있는 것처럼 사진을 찍고 꾸며보아요.", // 인자값으로 받은 title
        imageUrl: "url",
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route,
        },
      },
      buttons: [
        {
          title: "사진 찍으러 가기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],
    });
  }
};
