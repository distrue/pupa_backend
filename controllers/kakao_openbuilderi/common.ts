export function fallbackBlock(msg:string, type?: string) {
    let buttons:any = [];
    let imageUrl = "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%82%E1%85%AE%E1%84%91%E1%85%AE%E1%84%91%E1%85%A1+%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.PNG";
    if(type === 'coupon') {
        imageUrl = "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/coupon.png";
    }
    if(type === 'qrcode') {
      imageUrl = "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/qrque.png"
    }

    return({
        "version": "2.0",
        "template": {
          "outputs": [
            {
                "basicCard": {
                    "title": msg,
                    "buttons": buttons,
                    "thumbnail": {
                        "imageUrl": imageUrl
                    }
                }
            }]
        }
    });
}

export function basicCardCarousel(list:any[]) {
  return({
    "version": "2.0",
    "template": {
      "outputs": [
        {
          "carousel": {
            "type": "basicCard",
            "items": list
          }
        }
      ]
    }
  });
}
