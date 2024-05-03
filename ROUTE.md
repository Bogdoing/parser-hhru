http://localhost:5000/api/v1/

- / = "message": "🦄🌈✨👋🌎🌍🌏✨🌈🦄"

- /api/v1/ = "message": "API - 👋🌎🌍🌏"

- /api/v1/emojis = ["😀", "😳", "🙄"]

---

- /api/v1/git -> полйчить все записи таблицы git

- /api/v1/git/data/:data -> получить все записи за определённую дату

- /api/v1/git/lang/:lang -> получить все записи с фильтром по языку

- /api/v1/git/dataLang/:data/:lang -> получить все записи за определённую дату с фильтром по языку

---

- /api/v1/hh -> полйчить все записи таблицы hh

- /api/v1/hh/allData -> получить все даты

- /api/v1/hh/data/:data (/api/v1/hh/data/2024-03-19) -> получить все записи за определённую дату

- /api/v1/hh/lang/:lang - (/api/v1/hh/lang/php) -> получить все записи с фильтром по языку

- /api/v1/hh/region/:region - (/api/v1/hh/region/113) -> получить все записи с фильтром по региону

- /api/v1/hh/langRegion/:lang/:region - (/api/v1/hh/langRegion/php/113) -> получить все записи определённого языка в регионе

- /api/v1/hh/langData/:lang/:data - (/api/v1/hh/langData/php/2024-03-19) -> получить все записи определённого языка за определённую дату

- /api/v1/hh/dataRegion/:data/:region - (/api/v1/hh//dataRegion/2024-03-19/113) -> получить все записи за определённую дату в регионе

---

- /api/v1/parser = { msg: 'parserController - OK' }

- /api/v1/parser/hh - начать парсиг данных с hh

- /api/v1/parser/git - начать парсиг данных с github
