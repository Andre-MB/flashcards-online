FROM nginx:alpine

COPY dist/flashcards/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
