---
url : pages/press/hor-match-index/hor-match-index
type: horizontal
---

## HorMatchIndex 

Can be used on the homepage of in-game pages.

## Code Demo

### Basic usage

```html
<PressHorMatchIndex @back="onBack" />
```

```ts
import PressHorMatchIndex from 'press-ui/press-hor-match-index/press-hor-match-index.vue';

export default {
   components: {
     PressHorMatchIndex,
   },
   data() {
     return {

     };
   },
   methods: {
     onBack() {
       uni. navigateBack();
     },

   },
};
```

## API

### Props


| Parameter          | Description                                           | Type      | Default |
| ------------------ | ----------------------------------------------------- | --------- | ------- |
| showMessageDot     | Whether to show message red dot                       | _boolean_ | `false` |
| showPersonDot      | Whether to display the red dot in the personal center | _boolean_ | `false` |
| bannerList         | banner list                                           | _array_   | -       |
| brandList          | brand list                                            | _array_   | -       |
| recommendMatchList | recommended match list                                | _array_   | -       |
| onlineTabList      | Online Tab List                                       | _array_   | -       |
| onlineMatchMap     | online match list object                              | _array_   | -       |
| offlineMatchList   | offline match list                                    | _array_   | -       |



### Events

| Event Name | Description | Callback Parameters |
| ---------- | ----------- | ------------------- |  |----------- |
| back | Click the back icon in the upper left corner | - |
| clickMessage | Click the message icon in the upper right corner | - |
| clickPerson | Click on the personal center in the upper right corner | - |
| clickBanner | click banner | item, index |
| clickBrand | click on brand | item, index |
| clickMatchButton | Click the match button, such as "sign up" | `item`, `index`, `type` (`type` can be `recommend`/`online`/`offline`) |
| clickMatch | click match | `item`, `index`, `type` (`type` can be `recommend`/`online`/`offline`) |
| changeTab | Switch Tab | tab |


### Type Description

```ts
// bannerList
type IBannerList = Array<string>


// brandList
type IBrandList = Array<{
   name: string;
   img: string
}>

// recommendMatchList
type IRecommendMatchList = Array<{
   matchName: string;
   awardList: Array<{
     type: string; // such as champion award, third runner-up award
     img: string;
     name: string;
     popover: { // popup layer, display reward details
       title: string;
       content: string;
     };
   }>;

   brandImg: string;
   matchDesc: string; // such as 09.01 15:00 / offline match

   isNotStart: boolean;
   isEnd: boolean;
   isIng: boolean;
   btnTxt: string;

   matchLoc: string; // distance
   showApplyTag: boolean; // rewards for registration
   showJoinTag: boolean; // Participate with prizes
}>

//onlineTabList
type IOnlineTabList = Array<{
   name: string;
}>

// onlineMatchMap
type IOnlineMatchMap = IRecommendMatchList


// offlineMatchList
type IOfflineMatchList = Array<{
   banner: string;
   matchName: string;
   awardList: Array<{
     type: string; // such as champion award, third runner-up award
     img: string;
     name: string;
     popover: { // popup layer, display reward details
       title: string;
       content: string;
     };
   }>;
  
   matchDesc: string; // such as 09.01 15:00 / offline match

   isNotStart: boolean;
   isEnd: boolean;
   isIng: boolean;
   btnTxt: string;

   matchLoc: string; // distance
   showApplyTag: boolean; // rewards for registration
   showJoinTag: boolean; // Participate with prizes
}>
```