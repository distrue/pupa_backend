export function QREvent(data: any) {
    return{
        "version": "2.0",
        "template": {
        "outputs": [
            {
                "basicCard": {
                    "title": data.title,
                    "buttons":[
                        {
                            "action": "block",
                            "label": "참여 방법",
                            "blockId": `${data.blockId}`
                        },
                        {
                        "action": "message",
                        "label": "참여매장보기",
                        "messageText": `eventFor ${data.code}`
                    }
                    ],
                    "thumbnail": {
                        "imageUrl": data.imageUrl,
                        "fixedRatio": true
                    }
                }
            }]
        }
    }
}

export function QREventRule(code: string) {
    return{
        "version": "2.0",
        "template": {
        "outputs": [
            {
                "basicCard": {
                    "title": "적립 완료!",
                    "description": "내 적립 현황을 확인해보세요!",
                    "buttons": [
                        {
                            "action": "message",
                            "label": "내적립현황",
                            "messageText": `myScore ${code}`
                        }
                    ],
                    "thumbnail": {
                        "imageUrl": "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/qrokay.png"
                    }
                }
            }]
        }
    }
}