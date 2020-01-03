import {viewTitle, searchTitle} from '../../service/search';

export function inruleCell(item: any) {
    return({
        "title":item.title,
        "thumbnail": {
          "imageUrl": item.imageUrl,
          "fixedRatio": true
        },
        "buttons":[
            {
                "action": "message",
                "label": "내적립 현황",
                "messageText": `myScore ${item.code}`
            },
            {
              "action": "message",
              "label": "리워드 보기",
              "messageText": `eventRule ${item.code}`
            }
        ]
    });
}

export function noruleCell(item:any, reward?:string) {
    let cell:any = {
        "title":item.title,
        "thumbnail": {
          "imageUrl": item.imageUrl,
          "fixedRatio": true
        },
        "buttons":[
            {
              "action": "message",
              "label": "참여매장보기",
              "messageText": `eventFor ${item.code}`
          }
        ]
    }
    if(reward) cell.buttons.unshift({
      "action": "block",
      "label": "매장이벤트",
      "messageText": `${reward}`,
      "blockId": `${item.blockId}`
    })
    else cell.buttons.unshift({
      "action": "block", 
      "label": "이벤트 상세",
      "blockId": `${item.blockId}`
    })
    return cell;
}

export function targetMapCell(find: string) {
    return({
        "title": "참여매장 한눈에 보기",
        "description": "이벤트에 참여하고 있는 매장들을 한눈에 살펴보세요!",
        "thumbnail": {
          "imageUrl": "https://snuffstatic.s3.ap-northeast-2.amazonaws.com/kakaomap.png"
        },
        "buttons": [
          {
            "action": "webLink",
            "label": "지도로 보기",
            "webLinkUrl": `https://snufoodfighter.firebaseapp.com/?eventName=${find}`
          }
        ]
      })
}

export function targetCell(item:any, content: string) {
    return({
        "title": viewTitle(item.name),
        "description": content,
        "thumbnail": {
          "imageUrl": item.imgUrls[0]
        },
        "buttons": [
          {
            "action": "message",
            "label": "매장 정보 보기",
            "messageText": `askTotal ${searchTitle(item.name)}`
          },
          {
            "action": "message",
            "label": "매장 이벤트 보기",
            "messageText": `askEvent ${searchTitle(item.name)}`
          }
        ]
    });
}