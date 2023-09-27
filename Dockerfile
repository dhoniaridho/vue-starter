FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /home
COPY . .

RUN pnpm install

ENV VITE_BASE_URL="{{ VITE_BASE_URL }}"

RUN NODE_OPTIONS="--max-old-space-size=8192" pnpm build

FROM nginx
RUN mkdir /home/dist/
COPY --from=builder /home/dist/ /home/dist/
COPY deployment/config/nginx.conf /etc/nginx/conf.d/default.conf