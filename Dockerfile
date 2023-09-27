FROM node:20-slim AS base

WORKDIR /home
COPY . .

RUN pnpm install --force

ENV VITE_BASE_URL="{{ VITE_BASE_URL }}"

RUN NODE_OPTIONS="--max-old-space-size=8192" pnpm build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx
RUN mkdir /home/dist/
COPY --from=builder /home/dist/ /home/dist/
COPY deployment/config/nginx.conf /etc/nginx/conf.d/default.conf