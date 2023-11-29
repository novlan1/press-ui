# Contribution Guidelines


## 1. Directory structure

The project structure is as follows:

```bash
- docs # document address
- plugin # [demo] Plugins used in the project
- script # script
- tests # test cases
- src
   - common # [demo] public content
   - packages # Package content released externally
   - pages # [demo] page content
   - static # [demo] static content
   - App.vue # [demo] application entry
   - main.js
   - pages.json
```

In addition to components, the component library also has documentation, examples, engineering configuration and other parts. For the convenience of maintenance, examples, documents, and components are all placed in a folder, so a standard component directory is as follows:

```bash
-press-button
   - demo.vue # component example
   - press-button.vue # component
   - README.md # component Chinese documentation
   - README.en-US.md # component English documentation
```

`src/packages` is composed of these component folders and some public files.

The above organization structure cannot be used directly, you need to move `README.md` to `docs`, and `demo.vue` to `src/pages`. During development, these file changes will be monitored, and they will be copied to the required location after the change occurs.


## 2. Development


First, execute the following command to distribute components:

```bash
npm run init
```

### 2.1. Component development

There are different startup commands for H5, WeChat applets, and QQ applets:

```bash
npm run dev
# h5

npm run dev:mp-weixin
# WeChat applet

npm run dev:mp-qq
# qq applet
```

### 2.2. New components

Execute the following command:

```bash
npm run new:comp
```

Then interactively input the English name, Chinese name and other content of the component.



### 2.3. Document development

Document development command:

```bash
npm run docs:dev
```

### 2.4. Documentation, sample deployment

`press-ui` is connected to CI, and the code will be automatically built after the code is pushed, and the three-terminal examples and documents of H5, WeChat applet, and QQ applet will be deployed.

## 3. Development specification

### 3.1. Code specification

It must comply with the company code specification.

### 3.2. Submission Specifications

Recommended [Angular specification](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)


### 3.3. Naming convention

- Components `props` and `event` should be simple, easy to remember, and aligned with popular component libraries in the industry
- The class name must conform to the [BEM](https://getbem.com/) specification, you can refer to this [article](https://juejin.cn/post/7102980936232337445/)
- Export objects, classes, components, use the big camel case naming method, the first letter is capitalized
- Export method, use the camel case naming method, the first letter is lowercase, such as `loader`, `post`, `appBase`, `getAreaCode`, etc.;
- Use lowercase + dash in the file name, such as `message-dialog` instead of `messageDialog`;

## 4. Details

### 4.1. rem unit

Some components currently use `rem`

-Advantage: the h5 end is better adapted and more suitable
- Disadvantage: Additional plug-ins are required for conversion on other ends such as applets

`press-ui` does not enforce units, as long as the components are unified internally.

### 4.2. Access conditions

Components and logic in `press-ui` need to have certain generality or complexity, such as `button`, `input`, `area`, `message-detail` and other components are universal and strong, and `schedule-tree` components High complexity.

It is better to have less than too much. The sunken components must complete the BEM transformation and must be fully decoupled from the business.

>Get it from above, get it from within it, get it from it, get it from below, get it from below, and get nothing.

Try to design the components well from the beginning and adhere to high standards to avoid rework later.

### 4.3. Isolation from business

First of all, it is not necessarily business components that are precipitated from the business. The meaning of business components is generally poor in versatility, but can solve specific scenario problems. There are not many changes, poor flexibility, and parameters are not as many as basic components.

The components and logic of `press-ui` should reduce the coupling with the business and keep it stable. The basic components are easy to implement, and it is also easy to judge whether they are coupled or not. How to do it for those that have been settled in the business?

- Business status codes cannot exist, and multiple judgment logics should be completed in advance
- Separation of concerns, focus on the component itself, not the business
- The principle of least knowledge, only pass in the necessary parameters
  
For example, the event of clicking the round Tab in the schedule tree component cannot be named `jumpToSetPage`, and needs to be changed to `clickRoundTab` which has nothing to do with the business, because the jump round setting page is a business setting and is not necessarily stable. It is possible that the requirements will change in a few days, but the click on the Tab event is real and permanent.

In addition, the copywriting of the schedule tree cannot be driven by business status, but should be driven by UI. The following is the code before the change. It is over-coupled with the business. If the business adds a game state, the components will inevitably be changed.

```html
<!-- preview status -->
<div
   v-if="isPreview"
   class="tip-match-current-pk-tip"
>
   <!-- number -->
   <p
     v-if="battleDetail.bracketIdDesc"
     class="tip-match-num"
   >
     {{ battleDetail.bracketIdDesc }}
   </p>
   <p>&nbsp;</p>
   <p v-if="isAdmin">
     {{ isSchEnd ? 'End' : startBattleTypeDesc }}
   </p>
</div>

<!-- Ended -->
<div
   v-else-if="isSchEnd"
   class="tip-match-current-pk-tip"
>
   <p
     v-if="battleDetail.bracketIdDesc"
     class="tip-match-num"
   >
     {{ battleDetail.bracketIdDesc }}
   </p>
   <p>{{ battleEndTime }}</p>
   <p>
     over
   </p>
</div>

<!-- not started -->
<div
   v-else-if="isScheNotStart"
   class="tip-match-current-pk-tip"
>
   <p
     v-if="battleDetail.bracketIdDesc"
     class="tip-match-num"
   >
     {{ battleDetail.bracketIdDesc }}
   </p>
   <p>
     {{ readyInfoDesc }}
   </p>
</div>

<!-- in competition -->
<div
   v-else-if="isSchPlaying"
   class="tip-match-current-pk-tip"
>
   <p
     v-if="battleDetail.bracketIdDesc"
     class="tip-match-num"
   >
     {{ battleDetail.bracketIdDesc }}
   </p>
   <p>Current {{ battleDetail.curBo }}/{{ battleDetail.boType }} Bureau</p>
   <p class="tip-match-match-status">
     In the game
   </p>
   <div
     class="tip-match-match-zhibo-icon iconfont icon-live"
     @click.stop="onWatchBattle"
   />
   <div
     v-if="battleDetail.isWeChatLiving"
     class="iconfont icon-video-number"
   />
</div>
```

It can be changed to a business-independent UI state, and the business status code is pre-judged in JS to obtain the UI state. The core is where to display what style and what content:

- Whether to display the copy with background, `bracketIdDesc`
- Whether to show the label without background, `timeDesc`
- whether to show another label without background, and whether it can be text highlighted, `statusDesc`, `isStatusHighList`
- Whether to show the live icon, `showLiveIcon`
- Whether to display the video channel icon, `showChannelsIcon`


```html
  <div
   class="press-schedule-team-tips"
>
   <p
     v-if="scheGroupInfo.bracketIdDesc"
     class="press-schedule-team-tippress-schedule-team-tip--bg"
   >
     {{ scheGroupInfo.bracketIdDesc }}
   </p>
   <p
     v-if="scheGroupInfo.timeDesc"
     class="press-schedule-team-tip"
   >
     {{ scheGroupInfo. timeDesc }}
   </p>
   <p
     v-if="scheGroupInfo.statusDesc"
     class="press-schedule-team-tip"
     :class="{
       'press-schedule-team-tip--light': scheGroupInfo.isStatusHighList
     }"
   >
     {{ scheGroupInfo. statusDesc }}
   </p>
   <div
     v-if="scheGroupInfo.showLiveIcon"
     class="press-schedule-team-tip-icon press-schedule-team-tip-icon--green iconfont icon-live"
     @click.stop="onWatchBattle"
   />
   <div
     v-if="scheGroupInfo.showChannelsIcon"
     class="press-schedule-team-tip-icon iconfont icon-video-number"
   />
</div>
```

The above changes are not optimal and can be further optimized. For example, live icons and video number icons can be passed in as parameters to support more icon types. The naming can be more out of business, not named `timeDesc`, `statusDesc`.

`js` is more flexible than `html`. If it can be written in `js`, don’t judge it in the component. Flexibility means strong versatility. When cross-platform, horizontal and vertical screens, and technology stack migration, `js` can be very It is convenient for reuse, but components are not.
