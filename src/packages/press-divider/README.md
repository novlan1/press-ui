---
url : pages/press/divider/divider
---

## Divider 分割线

用于将内容分隔为多个区域。

## 代码演示

### 基础用法

```html
<press-divider />
```

### 使用 hairline

```html
<press-divider hairline />
```

### 虚线

```html
<press-divider dashed />
```

### 文本位置

```html
<press-divider contentPosition="center">文本</press-divider>
<press-divider contentPosition="left">文本</press-divider>
<press-divider contentPosition="right">文本</press-divider>
```

### 自定义属性

```html
<press-divider contentPosition="center" textColor="#1989fa">文本颜色</press-divider>
<press-divider contentPosition="center" borderColor="#1989fa">
  border 颜色
</press-divider>
<press-divider contentPosition="center" fontSize="18">字体大小</press-divider>
```

### 自定义样式

```html
<press-divider
  contentPosition="center"
  customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;"
>
  文本
</press-divider>
```

## API

### Props

| 参数             | 说明                              | 类型      | 默认值 |
| ---------------- | --------------------------------- | --------- | ------ |
| dashed           | 虚线                              | _boolean_ | false  |
| hairline         | 细线                              | _boolean_ | false  |
| content-position | 文本位置，`left` `center` `right` | _string_  | -      |
| custom-style     | 自定义样式                        | _string_  | -      |

### Slot

| 名称 | 说明           |
| ---- | -------------- |
| 默认 | 自定义文本内容 |

## 主题定制

<theme-config type="divider"/>