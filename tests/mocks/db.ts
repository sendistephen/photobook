import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  photo: {
    id: primaryKey(faker.string.uuid),
    urls: {
      thumb: () => faker.image.url(),
      small: () => faker.image.url(),
      full: () => faker.image.url(),
    },
    alt_description: () => faker.lorem.sentence(),
  },
});
