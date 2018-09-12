# Website API

Base domain for all requests is ``megumin.love/api``. Response format for all routes is JSON.

---

`GET /counter`

Returns the current global counter.

## Parameters

| Key    | Description                            | Format     | Example    |
| ------ | -------------------------------------- | ---------- | ---------- |
| ------ | -------------------------------------- | ---------- | ---------- |

### Example requests

`/counter`

Output:

```js
{
    "counter": 59206101
}
```

---

`GET /statistics`

Returns an object containing the website's statistics, mapped by their corresponding date.

## Parameters

| Key    | Description                                        | Format     | Example    |
| ------ | -------------------------------------------------- | ---------- | ---------- |
| from   | First day of statistics to be returned             | YYYY-MM-DD | 2017-05-27 |
| to     | Last day of statistics to be returned              | YYYY-MM-DD | 2017-06-05 |
| equals | The exact amount of clicks an entry must have      | Any number | 684826     |
| over   | The amount of clicks an entry must at least have   | Any number | 10000      |
| under  | The amount of clicks an entry must at max have     | Any number | 1000000    |

Supplying only the `from` parameter will result in the output only returning the specified date.

Supplying only the `to` parameter will result in the output starting at the earliest known date and return everything up to the specified date.

Omitting both the `from` and `to` parameter will return the entirety of the statistics from beginning to end (assuming no count filter is used).

All 3 amount filtering parameters (equals, over, under) can be used alongside each other, as well as alongside the time (from, to) filter.

### Example requests

`/statistics?from=2017-05-27&to=2017-06-05`

Output:

```js
{
    "2017-05-27": 529745,
    "2017-05-28": 3694,
    "2017-05-29": 3148,
    "2017-05-30": 3296,
    "2017-05-31": 2725,
    "2017-06-01": 14945,
    "2017-06-02": 12012,
    "2017-06-03": 1518,
    "2017-06-04": 2214,
    "2017-06-05": 14534
}
```

`/statistics?from=2017-11-26&to=2017-12-20&over=10000&under=1000000`

Output:

```js
{
    "2017-11-26": 895102,
    "2017-11-29": 137571,
    "2017-11-30": 65460,
    "2017-12-05": 66553,
    "2017-12-10": 19278,
    "2017-12-13": 471346,
    "2017-12-15": 25590
}
```

`/statistics?to=2017-12-20&equals=684826`

Output:

```js
{
    "2017-08-23": 684826
}
```

---

`GET /statistics/summary`

Returns a summary of the following counter statistics:

- All-time clicks
- Today's clicks
- This week's clicks
- This month's clicks
- This year's clicks
- Average clicks this month.

This summary is not available for any other time than the time of the request, but you can use the data from the `/statistics` endpoint and aggregate it like this endpoint's output format to achieve the same result for a different point in time.

## Parameters

| Key    | Description                            | Format     | Example    |
| ------ | -------------------------------------- | ---------- | ---------- |
| ------ | -------------------------------------- | ---------- | ---------- |


### Example requests

`/statistics/summary`

Output:

```js
{
    "alltime": 59206101,
    "daily": 336,
    "weekly": 336,
    "monthly": 26462,
    "yearly": 1706841,
    "average": 4410
}
```

---

`GET /sounds`

Returns an array of objects containing the following information on all of the website's sounds:
- ID
- filename
- displayname
- source
- count

## Parameters

| Key    | Description                                       | Format     | Example    |
| ------ | ------------------------------------------------- | ---------- | ---------- |
| source | Source a sound must be from to be returned        | Any string | Season 1   |
| equals | The exact amount of clicks a sound must have      | Any number | 51840      |
| over   | The amount of clicks a sound must at least have   | Any number | 25000      |
| under  | The amount of clicks a sound must at max have     | Any number | 50000      |

All 3 amount filtering parameters (equals, over, under) can be used alongside each other, as well as alongside the source filter.

### Example requests

`/sounds?source=Season 1`

Output:

```js
[
    {
        "id": 1,
        "filename": "eugh1",
        "displayname": "Eugh #1",
        "source": "Season 1",
        "count": 15532
    },
    {
        "id": 2,
        "filename": "eugh2",
        "displayname": "Eugh #2",
        "source": "Season 1",
        "count": 12671
    },
// ...
]
```

`/sounds?source=Season 2&over=25000&under=50000`

Output:

```js
[
    {
        "id": 38,
        "filename": "lalala",
        "displayname": "♬Explosions♬",
        "source": "Season 2",
        "count": 28496
    },
    {
        "id": 40,
        "filename": "mywin",
        "displayname": "My Win!",
        "source": "Season 2",
        "count": 27933
    }
]
```

`/sounds?source=Season 1&equals=51840`

Output:

```js
[
    {
        "id": 5,
        "filename": "explosion",
        "displayname": "Explosion!",
        "source": "Season 1",
        "count": 51840
    }
]
```