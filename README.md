# JSON Unescaped Unicode

[![Version](https://img.shields.io/visual-studio-marketplace/v/sunaoka.json-unescaped-unicode)](https://marketplace.visualstudio.com/items?itemName=sunaoka.json-unescaped-unicode)
[![Test](https://github.com/sunaoka/json-unescaped-unicode/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/sunaoka/json-unescaped-unicode/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/sunaoka/json-unescaped-unicode/branch/main/graph/badge.svg?token=ajoLI328xK)](https://codecov.io/gh/sunaoka/json-unescaped-unicode)

----

Unescape Unicode Escape Sequences in JSON.

## Features

![Features](assets/demo.gif)

## From

```json
{
    "hello": {
        "English": "Hello",
        "Japanese": "\u3053\u3093\u306b\u3061\u306f",
        "Korean": "\uc548\ub155\ud558\uc138\uc694",
        "Chinese": "\u4f60\u597d",
        "Arabic": "\u0645\u0631\u062d\u0628\u0627",
        "Hindi": "\u0928\u092e\u0938\u094d\u0924\u0947",
        "Ukrainian": "\u041f\u0440\u0438\u0432\u0456\u0442"
    }
}
```

## To

```json
{
    "hello": {
        "English": "Hello",
        "Japanese": "こんにちは",
        "Korean": "안녕하세요",
        "Chinese": "你好",
        "Arabic": "مرحبا",
        "Hindi": "नमस्ते",
        "Ukrainian": "Привіт"
    }
}
```
