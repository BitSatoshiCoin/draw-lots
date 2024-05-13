## Getting Started

First
```bash
# create conatiner
docker-compose build && docker-compose up -d
# exec conatiner
docker exec -it {conatiner_id} bash
```


run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

change your port in `.env` file