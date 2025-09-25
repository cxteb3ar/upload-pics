# Upload Pics

Introducing **Upload Pics**, a simple and secure image uploader with temporary and permanent storage options.  
It provides a clean API and an easy-to-use UI for managing and serving uploaded pictures.  

Made with 💗 by [CuteBear](https://www.cutebear.in.th).

## Features

- 📸 **Image Uploads** — Upload `.png`, `.jpg`, `.jpeg`, `.webp`, or any image files.
- ⏳ **Temporary & Permanent Storage** — Choose whether images expire or stay forever.
- 🔒 **Authentication** — Protected endpoints using session-based authentication.
- 🗑️ **File Management** — Delete uploaded images by ID or filename.
- ⚡ **Redis-Powered** — Stores metadata (id, filename, upload time, TTL).
- 📂 **Serve Like Static** — Images respond with proper `ETag`, `Last-Modified`, and cache headers.
- 🚫 **Duplicate Filename Protection** — Prevents uploading files with the same filename.
- ✨ **Copy & Share** — Easily copy public image URLs for sharing.

## Getting Started

### Prerequisites
- Node.js 18+
- Redis Instance
- pnpm / npm / yarn (`pnpm` is recommended.)

### Installation
Download the repository or clone this:
```bash
git clone https://github.com/qxebear/upload-pics.git
```
Run install command:
```bash
pnpm install
```

### Environment Setup
- Create a `.env.local` file or rename [.env.example](/.env.example) to `.env.local`.
- Grab your Redis URL.
- Generate a [NextAuth.js](https://authjs.dev) secret key through [CLI](https://cli.authjs.dev):
    ```bash
    pnpx auth secret
    ```
- Choose your own email and password.

### Run Development
```bash
pnpm dev
```

## API Endpoints
### Upload
```http
POST /api/upload
```
Upload a new image. Requires authentication.
### Delete
```http
DELETE /api/upload/:id
```
Deletes an image and its metadata. Requires authentication.
### Get Image
```http
GET /images/:filename
```
Fetch an image by its original filename, including the file extension.

## Contributing
Contributions are welcome! 🎉
If you’d like to improve **Upload Pics**, feel free to fork the repo and open a PR.
Bug reports and feature requests are also appreciated.


## License

This project is licensed under the [MIT License](/LICENSE).

---

> [!NOTE]
> You're welcome to fork and use this project.
> If you do, giving a little credit to me is appreciated. Thanks! <3

© 2023–present CuteBear. All rights reserved.
