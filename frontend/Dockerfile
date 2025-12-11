FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

EXPOSE 5173

# Start the application
CMD ["sh"]