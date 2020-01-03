export function couponBlock(item: any) {
    return({
        "title": item.display.title,
        "description": "",
        "thumbnail": {
          "imageUrl": item.display.imageUrl || 'https://snuffstatic.s3.ap-northeast-2.amazonaws.com/coupon.png'
        },
        "buttons": [
          {
            "action": "block",
            "label": "자세히 보기",
            "blockId": `${item.blockId}`
          }
        ]
    });
}