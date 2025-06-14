# osu!suggester

osu!suggester is a web app that recommends similar osu! beatmaps based on various map attributes and optional mod combinations.

Visit the website here: [https://osu-suggester.vercel.app](https://osu-suggester.vercel.app)


## Features

- Recommends maps based on similarity in aim, speed, BPM, CS, AR, difficulty, and object composition
- Support for mod combinations (DT, HT, HR, EZ, and their combinations)
- Filters to exclude specific modded maps
- A similarity score using Euclidean distance with weighted and scaled attributes
- Displays useful metadata and statistics for each map

## Tech Stack

### Frontend
- [Next.js (App Router)](https://nextjs.org)
- [Vercel](https://vercel.com)

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [Python](https://www.python.org)
- [osu!api v2](https://osu.ppy.sh/docs/index.html)
- [ossapi](https://github.com/tybug/ossapi)
- [rosu-pp-py](https://github.com/MaxOhn/rosu-pp-py)
- [scikit-learn](https://scikit-learn.org/)
- [Neon](https://neon.tech)

See [the API repo](https://github.com/gzhang0170/osu-suggester-flask) for more information on how the similarity algorithm works.

