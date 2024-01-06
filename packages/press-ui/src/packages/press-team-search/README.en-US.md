---
url: pages/press/team-search/team-search
---

## TeamSearch


## Introduction

```ts
import PressTeamSearch from 'press-ui/press-team-search/press-team-search';

export default {
   components: {
     PressTeamSearch,
   }
}
```

## Code Demo

### Basic usage


```html
<PressTeamSearch
   :team-list="teamList"
   :loading="loading"
   @search="onSearch"
   @clickTeam="onClickTeam"
   @clear="onClear"
   @focus="onFocus"
   @blur="onBlur"
/>
```

```ts
export default {
   data() {
     return {
       teamList: [],
       loading: false,
     }
   },
   methods: {
     onSearch() {},
     onClickTeam() {},
     onClear() {},
     onFocus() {},
     onBlur() {},
   }
}
```


## API

### Props

| Parameters           | Description                                              | Type      | Default value       |
| -------------------- | -------------------------------------------------------- | --------- | ------------------- |
| placeholder          | placeholder text                                         | _string_  | `Search event name` |
| custom-style         | custom style                                             | _string_  | -                   |
| default-search-words | Default search content                                   | _string_  | -                   |
| loading              | Whether it is loading                                    | _boolean_ | `false`             |
| show-content         | Whether to display search results, the default is a list | _boolean_ | `true`              |
| team-list            | team list                                                | _array_   | -                   |



### Events

| Event name | Description            | Parameters  |
| ---------- | ---------------------- | ----------- |
| focus      | Input box focus        | searchWords |
| blur       | input box out of focus | searchWords |
| search     | Click to search        | searchWords |
| clear      | Clear search content   | -           |
| clickTeam  | click team             | team        |

### Slot

| Name    | Description          |
| ------- | -------------------- |
| content | Search team list     |
| other   | other search results |



### teamList type

```ts
type ITeamList = Array<{
   team_id: string; // Need to be unique as key
   team_logo: string; // Team picture
   teamNameHtml: string; // HTML with team name highlighted
}>
```


### getHighLightHtml

Here is a method to obtain highlighted `html`, which can generate highlighted `html` based on previous content and search content.

```ts
import { getHighLightHtml } from 'press-ui/press-team-search/utils';

const teamName = '123123';
const searchWords = '1';


getHighLightHtml(teamName, searchWords, '#1181d7');
// <span style="color: #1181d7;">1</span>23<span style="color: #1181d7;">1</span>23
```
