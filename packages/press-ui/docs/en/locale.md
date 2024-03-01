# Internationalization


Press UI uses Chinese as the default language. If you want to use other languages, please follow the instructions below.

## Usage

### 1. Switch languages

Use the `locale.use` method to switch the currently used language. The following takes English as an example:


```ts
import locale from 'press-ui/locale';
// import the English language pack
import enUS from 'press-ui/locale/lang/en-US';

locale.use(enUS);
```


### 2. Override default configs


Use `locale.add` method to modify the default configs.

```ts
import locale from 'press-ui/locale';

const messages = {
  'en-US': {
    picker: {
      confirm: 'Close',
    },
  },
};

locale.add(messages);
```

### 3. Config files

Current supported languages:

| Language                 | Filename     |
| ------------------------ | ------------ |
| Chinese                  | zh-CN        |
| Traditional Chinese (HK) | zh-HK        |
| Traditional Chinese (TW) | zh-TW        |
| English                  | en-US        |
| German                   | de-DE        |
| German (formal)          | de-DE-formal |
| Norwegian                | nb-NO        |
| Japanese                 | ja-JP        |
| Romanian                 | ro-RO        |
| Spanish (Spain)          | es-ES        |
| Portuguese (Portugal)    | pt-PT        |
| Portuguese (Brazil)      | pt-BR        |
| Turkish                  | tr-TR        |
| Thai                     | th-TH        |
| French                   | fr-FR        |
| Vietnamese               | vi-VN        |


> View all language configs [Here](https://github.com/novlan1/press-ui/tree/develop/src/packages/locale/lang).
