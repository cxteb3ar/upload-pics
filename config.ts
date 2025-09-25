export default {
  images: {
    limit: 10, // limit max stroage for images
  },
} as Config;

export interface Config {
  images: {
    limit: number,
  }
}
