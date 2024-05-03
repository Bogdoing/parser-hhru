## CREATE TABLE hh

```sql
CREATE TABLE hh (
    id SERIAL PRIMARY KEY,
    lang VARCHAR(255),
    vac INT,
    vacRef VARCHAR(255),
    res VARCHAR(255),
    region VARCHAR(255),
    data DATE
);
```

```sql
INSERT INTO hh (lang, vac, vacRef, res, region, data)
VALUES
(
    'Ruby', 1400000, 'Vacancy Ref', 'Result', 'Region', '2024-02-28'
);
```

```sql
drop table hh
```

---

## CREATE TABLE git

```sql
CREATE TABLE git (
    id SERIAL PRIMARY KEY,
    count INTEGER,
    lang VARCHAR(150),
    data DATE
);
```

```sql
INSERT INTO data_records (count, lang, data)
VALUES (
    1400000, 'Ruby', '2024-02-28'
);
```

```sql
drop table git
```
