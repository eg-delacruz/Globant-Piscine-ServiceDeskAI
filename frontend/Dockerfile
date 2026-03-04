FROM node:20-alpine

# Install pnpm for package management
RUN corepack enable \
    && corepack prepare pnpm@latest --activate

WORKDIR /app

# Note: running as root in local development avoids permissions issues
# with bind-mounted volumes on Windows/WSL.
# For production images, prefer:
# RUN chown -R node:node /app
# USER node

EXPOSE 5173

# Signal handling via docker-compose init: true
# See docker-compose.yml for details

# Default command (overridden in docker-compose)
CMD ["sh"]