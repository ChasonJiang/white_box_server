import { Post,  } from './interface/Post'
import { USER_CARD_INFO } from './user'
const CONTENT:string=`<ion-text>The refresher provides pull-to-refresh functionality on a content component. The pull-to-refresh pattern lets a user pull down on a list of data using touch in order to retrieve more data.</ion-text>
<ion-text>Data should be modified during the refresher's output events. Once the async operation has completed and the refreshing should end, call complete() on the refresher.</ion-text>
<ion-title>Native Refreshers</ion-title>
<img class="images" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F26%2F20200326212002_rxlyj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640697027&t=df8a02eff4d6e537c10fbc6870de5825">
<ion-text>Both iOS and Android platforms provide refreshers that take advantage of properties exposed by their respective devices that give pull to refresh a fluid, native-like feel.</ion-text>`;
export const POST:Post={
    uid:88888888,
    pid:0,
    // userCard:USER_CARD_INFO,
    title:"Post Title",
    coverUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F26%2F20200326212002_rxlyj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640697027&t=df8a02eff4d6e537c10fbc6870de5825",
    releaseTime:"2021-11-18",
    topic:{
        tid:0,
        name:"test domain",
    },
    numberOfComments:5,
    numberOfApproval:99,
    isPaper:true,
    content:CONTENT,
};