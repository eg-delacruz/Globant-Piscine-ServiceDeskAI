FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

EXPOSE 3000

# Start the application
CMD ["sh"]