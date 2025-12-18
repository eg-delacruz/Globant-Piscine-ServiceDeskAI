FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache python3 g++ make
RUN corepack enable
RUN corepack prepare pnpm@10.26.0 --activate

# Set environment variable to skip prompts
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /app

EXPOSE 3000

# Start the application
CMD ["sh"]